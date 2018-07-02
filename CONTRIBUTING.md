# Contributing

Welcome to Thorium! Thorium is currently in Beta status, so there is still a lot
to be done.

_This contributing document borrows heavily from contributing docs by the
venerable [Kent C. Dodds](https://github.com/kentcdodds)._

## Requesting Features

- File an [issue](https://github.com/Thorium-Sim/thorium/issues). Issues are for
  bug reports, feature requests, and anything in between. If there is something
  you want done, file an issue!
- If you don't understand what an issue means, write a comment with your
  question and someone will explain in more detail.
- Check out the [roadmap](https://github.com/Thorium-Sim/thorium/projects/2) to
  know what features are coming and when they are coming.
- Read up on how Thorium works in the [docs](https://thoriumsim.com)

## Project Setup

1.  Fork and clone the repo
2.  `npm install`
3.  Create a branch from `develop` for your PR

> Tip: Keep your `develop` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/thorium-sim/thorium.git
> git fetch upstream
> git checkout -b develop
> git branch --set-upstream-to=upstream/develop develop
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `develop`
> branch to use the upstream develop branch whenever you run `git pull`. Then
> you can make all of your pull request branches based on this `develop` branch.
> Whenever you want to update your version of `develop`, do a regular
> `git pull`.

Then write some code and file a
[pull request](https://github.com/Thorium-Sim/thorium/pulls). A handful of
issues are labeled
[Help Wanted](https://github.com/Thorium-Sim/thorium/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
and are a good place to start.

## Add yourself as a contributor

This project follows the [all contributors][all-contributors] specification. To
add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

```console
npm run add-contributor
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR. If
you've already added yourself to the list and are making a new type of
contribution, you can run it again and select the added contribution type.

## Pull Request Guidelines

All pull requests and issues are welcome, with the following requirements:

- Pull requests should branch from `develop` and target the `develop` branch,
  following the git-flow pattern. Releases will be merged into `master` and
  released at least weekly from the changes in the `develop` branch.
- Unless the pull request is a small one-off feature or bug fix, the pull
  request should reference an issue. If you are intending to start working on a
  new feature for some period of time, let me know first. This helps me make
  sure I don't work on something which you are already working on. If an issue
  exists, comment on it saying that you are working on it. If an issue doesn't
  exist, create one.
- Any new pull requests will not be accepted unless a corresponding issue or
  pull request from [thorium-docs](https://github.com/Thorium-Sim/thorium-docs)
  is referenced, within reason. Some things don't need to be documented, but if
  there is any reason for docs to be created or updated, this will be a hard
  requirement.
