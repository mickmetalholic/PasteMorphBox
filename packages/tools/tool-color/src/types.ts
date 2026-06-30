export type RgbState = {
  mode: 'rgb'
  r: number
  g: number
  b: number
  alpha: number
}

export type HslLike = {
  h?: number
  s?: number
  l?: number
  alpha?: number
}

export type HsvLike = {
  h?: number
  s?: number
  v?: number
  alpha?: number
}

export type OklchLike = {
  l?: number
  c?: number
  h?: number
  alpha?: number
}
