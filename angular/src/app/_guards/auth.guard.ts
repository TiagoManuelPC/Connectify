import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const router = inject(Router);
    const toastr = inject(ToastrService);

    if (accountService.currentUser()) {
        return true;
    }
    else {
        toastr.error('You are not authorize to visit this page!');
        router.navigate(['/login']);
        return false;
    }
};
