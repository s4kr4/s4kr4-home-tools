const generateShortURL = (id: string) => `https://youtu.be/${id}`

export default ({}, inject: any) => {
  inject('generateShortURL', generateShortURL)
}

