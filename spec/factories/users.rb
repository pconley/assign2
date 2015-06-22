FactoryGirl.define do
  
  factory :user do
    agency      { FactoryGirl.create(:agency) }
    email       { Faker::Internet.email }
    username    { Faker::Internet.user_name }
    password    'Password1'
  end
  
  factory :admin, parent: :user do
    role :admin
  end
  
  factory :person, parent: :user do
    # a person is a user with a name etc.
    last_name   { Faker::Name.last_name }
    first_name  { Faker::Name.first_name }
    middle_name { [Faker::Name.first_name,nil,nil,'J','A','P'].sample }
    prefix      { [Faker::Name.prefix,nil,nil].sample }
    # address     { FactoryGirl.create(:address) }
    # phones      { [FactoryGirl.create(:phone)] }
  end
  
  
  # factory :requester, parent: :user do
  #   role :requester
  #   customer { FactoryGirl.create(:customer) }
  # end
  # 
  # factory :consumer, parent: :user do
  #   role :consumer
  #   last_name   { Faker::Name.last_name }
  #   first_name  { Faker::Name.first_name }
  #   middle_name { [Faker::Name.first_name,nil,nil,'J','A','P'].sample }
  #   prefix      { [Faker::Name.prefix,nil,nil].sample }
  #   address     { FactoryGirl.create(:address) }
  #   phones      { [FactoryGirl.create(:phone)] }
  # end
  
  factory :interpreter, parent: :person do
    role :interpreter
    default_payrate { Faker::Number.between(3000,9900) }
  end

end
