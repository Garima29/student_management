Rails.application.routes.draw do
  root :to =>'homes#index'
  get 'classrooms/non_archive_index' => 'classrooms#non_archive_index'
  get 'classrooms/:id/teacher_classrooms' => 'classrooms#teacher_classrooms'
  resources :classrooms
  get 'subjects/teacher_subjects' => 'subjects#teacher_subjects'
  resources :subjects
  get 'students/:id/classroom_students' => 'students#classroom_students'
  resources :students

  get 'teachers/non_archive_index' => 'teachers#non_archive_index'


  resources :teachers
  get 'schools/non_archive_index' => 'schools#non_archive_index'
  resources :schools
  put 'schools/:id/archive' =>  'schools#archive'
  put 'classrooms/:id/archive' =>  'classrooms#archive'
  put 'teachers/:id/archive' =>  'teachers#archive'
  put 'students/:id/archive' =>  'students#archive'
  put 'subjects/:id/archive' =>  'subjects#archive'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
