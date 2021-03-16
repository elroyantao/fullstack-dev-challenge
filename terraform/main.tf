# --------------------------------------
# Module: Website Bucket
# --------------------------------------
module "website" {
  source = "git::https://github.com/EATechSolutions/tf-aws-library.git//s3-static-website"

  application_name = var.application_name
  environment      = var.environment
}

# --------------------------------------
# Module: SSM Parameters
# --------------------------------------
module "ssm_parameters" {
  source = "git::https://github.com/EATechSolutions/tf-aws-library.git//ssm"

  application_name = var.application_name
  environment      = var.environment

  parameters = {
    "website_s3_bucket" = {
      type  = "String"
      value = module.website.bucket
    }
  }
}