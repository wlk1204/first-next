declare module '*.scss' {
  const content: any;
  export default content;
}

interface Irender {
  draw?: (id: any, data: any, oldData: any) => void
}
