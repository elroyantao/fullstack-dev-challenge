terraform {
  backend "remote" {
    organization = "EATechSolutions"
    workspaces {
      name = "finimize-prod"
    }
  }
}
