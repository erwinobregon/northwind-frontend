import { FormControl } from "@angular/forms";

export class WhiteSpaceValidators{
    static cannotContaintSpace(formControl:FormControl){
        if (formControl.value.indexOf(' ')>0) {
            return {cannotContaintSpace:true};
            
        }
        return null;
    }

}