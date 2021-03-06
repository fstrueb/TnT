% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/tntBoard.R
\name{tntboard}
\alias{tntboard}
\alias{TnTBoard}
\alias{tntgenome}
\alias{TnTGenome}
\title{TnTBoard}
\usage{
TnTBoard(tracklist, view.range = GRanges(), coord.range = IRanges(),
  zoom.allow = IRanges(), allow.drag = TRUE, use.tnt.genome = FALSE)

TnTGenome(tracklist, view.range = GRanges(), coord.range = IRanges(),
  zoom.allow = IRanges(), allow.drag = TRUE)
}
\arguments{
\item{tracklist}{One track or a list of tracks to view.}

\item{view.range}{Length-one GRanges object, sets the initial view range.}

\item{coord.range}{Length-one IRanges object or length-two numeric vector,
sets the coordinate limit of the board (i.e. minimum/maximum possible coordinate).}

\item{zoom.allow}{Length-one IRanges object or length-two numeric vector,
sets the minimum and maximum extent of the board (i.e. the limit when zooming in and zooming out).}

\item{allow.drag}{Logical, whether drag should be allowed? Default TRUE.}

\item{use.tnt.genome}{Logical, whether to add axis and location. `TnTGenome(...)` is essentially
a wrapper to `TnTBoard(..., use.tnt.genome = TRUE)`.}
}
\value{
Returns a TnTBoard or TnTGenome object which has printing method to be rendered
    as a htmlwidget.
}
\description{
A TnTBoard or TnTGenome object stores a list of tracks and can be automatically
shown in an interactive R session or in rmarkdown output.
}
\examples{
track <- BlockTrack(GRanges("chr1", IRanges(start = c(100, 300, 500), width = c(10, 100, 200))))
\dontrun{
TnTGenome(track)
}
}
