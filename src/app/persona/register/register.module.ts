import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { HttpClientModule } from '@angular/common/http';
import { LoginServiceService} from './../servicio/login-service.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegisterPage],
  providers: [LoginServiceService]
})
export class RegisterPageModule {}
