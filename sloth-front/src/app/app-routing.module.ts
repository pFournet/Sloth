import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdmAuthGuard } from './guards/admin-guards';
import { AuthGuard } from './guards/auth-guards';


// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { CreateServerFormComponent } from "./views/admin/create-server-form/create-server-form.component";
import { InfrastructurePageComponent } from "./views/admin/infrastructure-page/infrastructure-page.component";
import { ConfigurePageComponent } from "./views/admin/configure-page/configure-page.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { LandingComponent } from "./views/landing/landing.component";
import { SolverComponent } from "./views/solver/solver.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    // canActivate: [AuthGuard], // Protect all routes under "admin" with AuthGuard
    canActivate: [AdmAuthGuard],


    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "create-server-form", component: CreateServerFormComponent },
      { path: "infrastructure-page", component: InfrastructurePageComponent },
      { path: "configure/:id", component: ConfigurePageComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      //{ path: "login", component: LoginComponent },
      //{ path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },

  // no layout views
  { path: 'solver', component: SolverComponent, canActivate: [AuthGuard] },
  { path: "landing", component: LandingComponent },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
