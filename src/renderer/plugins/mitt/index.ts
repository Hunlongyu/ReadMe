import mitt from 'mitt'

export type Events = {
  [key: string]: string
}

const bus = mitt<Events>()

export default bus
