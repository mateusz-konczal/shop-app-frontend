import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { JwtService } from "src/app/modules/common/service/jwt.service";

export const adminAuthorizationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const jwtService = inject(JwtService);
    const router = inject(Router);

    if (!jwtService.isTokenValid()) {
        router.navigate(["/admin/login"]);
    }

    return true;
}
