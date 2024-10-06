import { EnumRoutes } from "./Enums"

export const HeaderEnableValidator = (path : string) => {
   return path != EnumRoutes.HOME && path != EnumRoutes.LOGIN && path != EnumRoutes.REGISTER
}