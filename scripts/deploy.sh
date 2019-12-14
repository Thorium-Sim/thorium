function bell() {
  while true; do
    echo -e "\a"
    sleep 60
  done
}
bell &
npx semantic-release
exit $?
