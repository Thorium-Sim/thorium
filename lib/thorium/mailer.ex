defmodule Thorium.Mailer do
 import Bamboo.MailgunAdapter
 import Bamboo.Email
 use Bamboo.Mailer, otp_app: :thorium

 def forgot_password_email(user) do
  new_email
  |> to(user.email)
  |> from("me@directory.ralexanderson.com")
  |> subject("Password reset for " <> user.email)
  |> html_body("<h3>A password reset has been requested on behalf of " <> user.email <> ".</h3><p>You can reset your password by following this link: <a href=\"" <> Thorium.Endpoint.url <> "/reset_password/" <> user.resetLink <> "\">"  <> Thorium.Endpoint.url <> "/reset_password/" <> user.resetLink <> "</a></p><p>If you did not request this password reset, you may disregard this email.</p>")
  |> text_body("welcome")
end
end