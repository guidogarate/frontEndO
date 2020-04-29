import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { REPO_000_MODULES_ROUTES } from "./repo_000.routes";
import { Repo000Component } from "./repo000/repo000.component";

@NgModule({
  declarations: [Repo000Component],
  providers: [],
  imports: [CommonModule, REPO_000_MODULES_ROUTES, FormsModule],
})
export class REPO00Module {}
