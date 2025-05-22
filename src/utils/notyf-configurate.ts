import {Notyf} from "notyf";

export const notyfConfigurate = () => {
    const notyf = new Notyf({
        position: {x: 'right', y: 'bottom'},
        duration: 3500
    });
    return notyf
}