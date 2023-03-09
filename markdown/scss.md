---
title: Learning SCSS
description: Notes on SCSS file structures and best practices
tags: SCSS
---
# Learning SCSS

## Partials

### Underscore Usage

Adding **underscores** to filenames in SCSS is used for **partial** files.  These are files that are only imported to the ***main*** file in the scss root folder.  They are used as when compiling scss to css any files with an underscore are left out.  Meaning we end up with one CSS file for all partial SCSS files, rather than a compiled file for each partial.

### To @import or to @USE
