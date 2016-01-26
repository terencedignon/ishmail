Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :emails, only: [:create, :destroy, :update, :show, :index]
    resources :users, only: [:index, :show, :create, :update]
    resources :chats, only: [:show, :create]
    resources :lines, only: [:create, :show, :index]
  end


  resources :users, only: [:new, :create, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
end
