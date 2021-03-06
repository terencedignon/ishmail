class AuthMailer < ActionMailer::Base
  default :from => 'admin@ishmail.co'

  # send a signup email to the user, pass in the user object that
  # contains the user's email address
  def signup_email(user)
    mail(
      to: "terry.p.dignon@gmail.com",
      subject: 'Thanks for signing up'
    )
  end
end
