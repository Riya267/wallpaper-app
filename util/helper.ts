import { Dimensions } from "react-native"

export const { width, height } = Dimensions.get("screen");

export const getColumns = () => {
    if(width >= 1024) return 4;
    else if(width >= 768) return 3;
    else return 2;
}


export const getImageSize = (height:number, width: number) => {
   if(width > height) return 250;
   else if(width < height) return 300;
   else return 200;
}