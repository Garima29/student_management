require 'rails_helper'

RSpec.describe HomesController, type: :controller do
    it 'should render available view' do
      get :index
      redirect_to '/homes/index'
    end
end