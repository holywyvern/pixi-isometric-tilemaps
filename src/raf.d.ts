declare module "raf" {
  const raf: (tick : () => any) => any;
  export = raf;
}