import { error } from "@plugins/errors";
import { Elysia, type ElysiaConfig } from "elysia";

const baseElysia = <
  const BasePath extends string = "",
  const Scoped extends boolean = false
>(
  config?: ElysiaConfig<BasePath, Scoped>
) => new Elysia(config).use(error);

const createBaseElysia = (config?: Parameters<typeof baseElysia>[0]) =>
  new Elysia(config) as ReturnType<typeof baseElysia>;

export { baseElysia, createBaseElysia };
