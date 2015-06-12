FactoryGirl.define do
  factory :agency do
    agency_name  { Faker::Company.name }
    contact_name { Faker::Name.name }
  end
end
