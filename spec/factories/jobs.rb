FactoryGirl.define do
  
  factory :job do
    agency         { FactoryGirl.create(:agency) }
    customer_id    { FactoryGirl.create(:customer, agency: agency).id }
    # consumer_id    { FactoryGirl.create(:consumer, agency: agency).id }
    description    { Faker::Lorem.sentence([4,5,6].sample) }
    starts_at      { Faker::Time.forward([-2,-1,0,1,2,3,4,5,6,7].sample,:all) }
    start_time     { Time.parse("1:00pm") }
    duration       { [30,60,90].sample }
    repeat_style   nil # does not repeat
    status         'Active'
    requested_at   Time.zone.now
  end
  
  factory :job_with_interpreter, parent: :job do |f|
    after(:create) do |job|
      job.interpreter = FactoryGirl.create(:interpreter, agency: job.agency)
      job.save!
    end
  end
   
end
