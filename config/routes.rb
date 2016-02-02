Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :emails, only: [:create, :destroy, :update, :show, :index] do
      collection do
        post 'mass_update'
        delete 'mass_destroy'
      end
    end
    get "search", to: "utils#search"
    resources :users, only: [:index, :show, :create, :update]
    resources :chats, only: [:show, :create]
    resources :lines, only: [:create, :show, :index]
  end


  resources :users, only: [:new, :create, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
end
