function changed {
  git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep "^$1" > /dev/null 2>&1
}

if changed 'yarn.lock'; then
  echo -ne '\u000a\u001b[31mNOTICE:\u001b[m \u001b[33mDetected a change in \u001b[37myarn.lock\u001b[33m. Update dependencies by running \u001b[36myarn\u001b[m\u000a'
fi

if changed 'composer.lock'; then
  echo -ne '\u000a\u001b[31mNOTICE:\u001b[m \u001b[33mDetected a change in \u001b[37mcomposer.lock\u001b[33m. Update dependencies by running \u001b[36mcomposer install\u001b[m\u000a'
fi

if changed 'database/factories/'; then
  echo -ne '\u000a\u001b[31mNOTICE:\u001b[m \u001b[33mDetected a change in \u001b[37mdatabase/factories\u001b[33m. Update database by running \u001b[36myarn seed\u001b[m\u000a'
fi

if changed 'database/migrations/'; then
  echo -ne '\u000a\u001b[31mNOTICE:\u001b[m \u001b[33mDetected a change in \u001b[37mdatabase/migrations\u001b[33m. Update database by running \u001b[36myarn seed\u001b[m\u000a'
fi

if changed 'database/seeders/'; then
  echo -ne '\u000a\u001b[31mNOTICE:\u001b[m \u001b[33mDetected a change in \u001b[37mdatabase/seeders\u001b[33m. Update database by running \u001b[36myarn seed\u001b[m\u000a'
fi

exit 0
