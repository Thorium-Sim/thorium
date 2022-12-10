/**
 * @description  A Process performs updates at a given frequency.
 * This class is not meant to be used directly and should be sub-classed to
 * define specific logic.
 */
export abstract class Process {
  /**
   * Frequency of update execution, a frequency of `1` run the system every
   * update, `2` will run the system every 2 updates, ect.
   */
  frequency: number;

  constructor(frequency: number = 1) {
    this.frequency = frequency;
  }

  // methods to be extended by subclasses
  /**
   * Abstract method to subclass. This is
   * the only method that should actually mutate state.
   */
  abstract update(elapsedMs: number): void;
}
