class AddPlaylistToTrack < ActiveRecord::Migration[5.2]
  def change
    add_reference :tracks, :playlist, foreign_key: true
  end
end
