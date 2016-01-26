class UsersController < ApplicationController
  def new
  end

  def create

    @user = User.new(user_params)
    if @user.save
      redirect_to :new
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy

  end

  private

  def user_params
    params.require(:user).permit(
      :fname, :lname, :password, :password_confirmation, :location, :username, :birth_month, :birth_day, :birth_year
    )
  end
end
