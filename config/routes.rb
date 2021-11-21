Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
    end
  end
  # root 'posts#index'
  # get '/*path' => 'posts#index'
  
  devise_for :users
  get 'authentication/login'
  get '/app', to: 'authentication#app', as: 'app'

  root 'authentication#login'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
