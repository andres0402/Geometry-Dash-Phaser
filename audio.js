const INIT_AUDIOS = [
    {
      key: 'stereo madness',
      path: 'assets/music/StereoMadness.mp3'
    },
    {
      key: 'explode',
      path: 'assets/music/explode.mp3'
    },
  ]
  
  export const initAudio = ({ load }) => {
    INIT_AUDIOS.forEach(({ key, path }) => {
      load.audio(key, path)
    })
  }
  
  export const playAudio = (id, { sound }, { volume = 1 } = {}) => {
    console.log(id)
    try {
      return sound.add(id, { volume }).play()
    } catch (e) {
      console.error(e)
    }
  }
  