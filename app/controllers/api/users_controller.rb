class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    
    @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render json: @user
      else
        render json: @user.errors.full_messages
      end
  end

  private
  def user_params
    params.require(:user).permit(
      :fname, :lname, :password, :password_confirmation,  :username
    )
  end
end
