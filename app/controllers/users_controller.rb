class UsersController < ApplicationController

  # before_action :forbid_signed_in

  def new
    @user = User.new
  end

  def show
    @user = current_user.includes(contact: :contacts)
  end

  def create

    @user = User.new(user_params)
    if @user.save

      redirect_to root_url
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
      :fname, :lname, :password, :gender, :password_confirmation, :location, :username, birthday: []
    )
  end
end
