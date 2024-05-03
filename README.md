# INDA-Projekt
Fix da DMK hemsida

- [INDA-Projekt](#inda-projekt)
  * [Run](#run)
    + [START DB](#start-db)
  * [Repo structure](#repo-structure)
  * [Project Specification](#project-specification)
    + [Links](#links)
      - [Dependencies](#dependencies)
    + [Naming conventions](#naming-conventions)
      - [Issues and Commits](#issues-and-commits)
      - [PRs](#prs)
    + [Project Description](#project-description)
    + [MVP Requirements](#mvp-requirements)

## Run

### START DB
- Create a `.env` file
- Add parameter, eg: `POSTGRES_CONNECTION=postgres://dkm:dkm@localhost:5432/dkm`
- Change the values in the `database.sh` file
- Start the database by runnning `database.sh`
- You may need to add sudo permissions etc to the `.sh` file

https://www.canva.com/design/DAGAOIe0X-w/Dq1IdkRHaqR6XdAoQafNTw/edit?utm_content=DAGAOIe0X-w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

DKM go brrrrrrrrrrrrrrrrrrrrrrrrrrr

## Repo structure


## Project Specification
### Links
* [Trello](https://trello.com/b/GDtDiiEx/inda-projekt)
* [Canva](https://www.canva.com/design/DAGAOIe0X-w/Dq1IdkRHaqR6XdAoQafNTw/edit?utm_content=DAGAOIe0X-w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
#### Dependencies
* [Goquery](github.com/PuerkitoBio/goquery)
### Naming conventions
#### Issues and Commits
Each commit should preferabbly have a connected issue to help us keep track. Feature branches can also be used as an alternative.  
*[Project-week-0](https://github.com/IndaPlus23/RaySorcerers-Instructions/tree/master/project-week-0): Gotta use the issue tracker. "For every feature you want to create (or bug to fix), there should be an associated issue"*
#### PRs
When merging a branch the main feature or purpose should stand as the PR title nad use the following keywords. The PR description should include a list of all changes.
* [Feature]: Used when implementing a new feature. A short description and example usecase should preferably be included.
* [Quickfix]: A simpler fix for a issue that hasn't had time to become a github issue yet.
* [Refactor]: Reworking an old feature or infrastucture.
* [Fix #[number]]: A fix associated with a github issue.
### Project Description
(Include short part about how feasible your project is and how it can be divided into weeks)
This project aims to create a [new website](dkm.io) for the student club [DKM](https://www.datasektionen.se/en/clubs/dkm).  
The project should include a new landing page, event page and about page. We also want to set up a reliable back-end for the webpage to handle storing and fetching events. Hopefully we also have time to reach some of our streatch goals like including the drinks menu.
### MVP Requirements
See Canva project above. The parts of the map colored cerise is the MVP of this project. 
### Who does what?
We have chosen to divide the project between us using trello. Since we are only two developers we don't see a need to decide all aspects of dividing the work right from the start. Instead all tasks are written in trello and we just asign ourselves to whatever we are currently working on or planning.
