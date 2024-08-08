import { createAnimations } from './animations.js'
import { initAudio, playAudio } from './audio.js'
import { initSpritesheet } from './spritesheet.js'

const config = {
    autoFocus: false,
    type: Phaser.AUTO, // webgl, canvas
    width: 1720,
    height: 850,
    backgroundColor: '#fff',
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: {
      preload, // se ejecuta para precargar recursos
      create, // se ejecuta cuando el juego comienza
      update // se ejecuta en cada frame
    }
  }

  
  new Phaser.Game(config)

  function preload(){
    this.load.image(
        'background',
        'assets/background/background.png'
      )

    this.load.image(
        'ground',
        'assets/ground.png'
      )

    this.load.image(
        'player',
        'assets/player.png'
      )

    this.load.image(
        'spike',
        'assets/spike.png'
      )

    this.load.image(
      'block',
      'assets/block.png'
    )

    initSpritesheet(this)

    initAudio(this)
    
}

function create(){
    
    createAnimations(this)
    const backgroundWidth = this.textures.get('background').getSourceImage().width;

    for(let i = 0; i < 100; i++){
        this.add.image(i*backgroundWidth*2.5, 0, 'background')
        .setOrigin(0, 0)
        .setScale(2.5)
    }

    const totalWidth = 100 * backgroundWidth * 2.5;


    this.floor = this.physics.add.staticGroup()

    for(let i = 0; i < 100; i++){
        this.floor
          .create(256*i, config.height - 64, 'ground')
          .setOrigin(0, 0.5)
          .setScale(3, 2)
          .refreshBody()
    }


    this.player = this.physics.add.sprite(600, 605, 'player')
      .setOrigin(0.5, 0.5)
      .setCollideWorldBounds(true)
      .setGravityY(1600)
      .setScale(0.9, 0.9)

    

    this.spikes = this.physics.add.staticGroup()

    this.spikes
        .create(800, 615, 'spike')
        .setOrigin(0, 0.5)
        .setScale(1.5, 1.5)
        .refreshBody()

    this.blocks = this.physics.add.staticGroup()

    this.blocks
        .create(1500, 610, 'block')
        .setOrigin(0, 0.5)
        .setScale(1.6, 1.6)
        .refreshBody()
        .body.setSize(this.blocks.getChildren()[0].displayWidth, this.blocks.getChildren()[0].displayHeight);

    this.physics.add.collider(this.player, this.floor)

    this.physics.add.collider(this.player, this.spikes, onHitEnemy, null, this)

    this.physics.add.collider(this.player, this.blocks, onHitBlock, null, this)

    this.cameras.main.setBounds(0, 0, totalWidth, config.height)

    playAudio("stereo madness", this)


  }

  function onHitEnemy (player, spike) {
    if(player.isDead) return

    this.explosion = this.physics.add.sprite(this.player.x, this.player.y, 'explosion')
    .setOrigin(0.5, 0.5)
    .setScale(0.4)
    .setGravityY(0)

    this.explosion.anims.play('player-explosion')
    setTimeout(() => {
        playAudio("explode", this, {volume: 0.2})
      }, 1)
    killPlayer(player, this)
   
  }


  function onHitBlock (player, block) {
    if(player.isDead) return
    console.log(player.body.touching.right)
    console.log(block.body.touching.left)
    if (player.body.touching.right && block.body.touching.left){

        
        this.explosion = this.physics.add.sprite(this.player.x, this.player.y, 'explosion')
        .setOrigin(0.5, 0.5)
        .setScale(0.4)
        .setGravityY(0)

        this.explosion.anims.play('player-explosion')
        setTimeout(() => {
            playAudio("explode", this, {volume: 0.2})
      }, 1)

       killPlayer(player, this)
    }
    

  }

  function killPlayer(player, {sound, scene}){
    player.isDead = true
    player.destroy()
    sound.stopAll()


    setTimeout(() => {
        scene.restart()
      }, 1000)
  }


  function update(){
    const isClickPressed = this.input.activePointer.isDown
    if(!this.player.isDead){

        const isPlayerTouchingFloor = this.player.body.touching.down
        if (isClickPressed && this.input.activePointer.buttons === 1 && isPlayerTouchingFloor) {
            this.player.setVelocityY(-700)
        }

        const cameraSpeed = 10;
        // Mover la cámara hacia la derecha
        this.cameras.main.scrollX += cameraSpeed;
        this.player.x += 10
    }
  }