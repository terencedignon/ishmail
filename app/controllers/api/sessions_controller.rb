
class Api::SessionsController < ApplicationController

  def show
    sleep 2

    if current_user
      @user = current_user
      render json: @user
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if @user.nil?
      # flash.now[:alert] = "Wrong email/password combo"
      # render :new, status: 401
      render json: ["Wrong email/password combo!"], status: 401
    else
      sign_in(@user)
      # redirect_to root_url
      render json: @user
    end
  end

  def destroy
    user = current_user
    sign_out
    render json: user
    # redirect_to new_session_url
  end


end
