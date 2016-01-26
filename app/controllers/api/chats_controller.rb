class ChatsController < ApplicationController

  def index
  end

  def show
    @chat = Chat.find(params[:id])
  end

end
