// success.guard.ts
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { selectUser } from '../store/user/user.selectors';

export const successGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      const canAccess = !!user?.id;

      if (!canAccess) {
        router.navigate(['/']);
      }

      return canAccess;
    })
  );
};
