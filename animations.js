export const createAnimations = (game) => {
    game.anims.create({
      key: 'player-explosion',
      frames: game.anims.generateFrameNumbers(
        'explosion',
        { start: 0, end: 5 }
      ),
      frameRate: 12,
    })

}