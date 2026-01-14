import { Observable } from "rxjs"

export interface OnExit {

    OnExit: () => Observable<boolean> | Promise<boolean> | boolean
}
