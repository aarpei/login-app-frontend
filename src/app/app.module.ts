import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,

    LoginModule,
    /* UserModule, */
    SignUpModule,

    ComponentsModule,
    SharedModule,
  ],
  /* providers: [CrudExceptionHandler], */
  bootstrap: [AppComponent],
})
export class AppModule {}
