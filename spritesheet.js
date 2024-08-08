const INIT_SPRITESHEETS = [
    {
      key: 'explosion',
      path: 'assets/explosion.png',
      frameWidth: 540,
      frameHeight: 584
    },
  ]
  
  export const initSpritesheet = ({ load }) => {
    INIT_SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
      load.spritesheet(key, path, { frameWidth, frameHeight })
    })
  }
  