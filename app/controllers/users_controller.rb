class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to success_user(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def success
    @user = User.find(params[:id])
  end

  def destroy

  end

  private

  def user_params
    params.require(:user).permit(
      :fname, :lname, :password, :password_confirmation, :location, :username, :birth_month, :birth_day, :birth_year 
    )

end
