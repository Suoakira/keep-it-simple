class CreateUserGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :user_goals do |t|
      t.integer :target
      t.integer :user_id
      t.integer :goals_id
      t.timestamps
    end
  end
end
