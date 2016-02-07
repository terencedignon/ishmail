class SessionsController < ApplicationController

  # before_action :forbid_signed_in

  def new

  end

  def create
    user = User.find_by_credentials(params[:username], params[:password])
    if user
      sign_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

end
