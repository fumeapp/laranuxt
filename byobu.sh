PROJECT="laranuxt"
byobu-tmux -2 new-session -d -s $PROJECT
byobu-tmux send-keys "cd ~/$PROJECT; yarn dev" C-m
byobu-tmux split-window -v
byobu-tmux select-pane -t 1
byobu-tmux send-keys "cd ~/$PROJECT; yarn api" C-m
