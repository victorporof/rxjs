// @ts-ignore
const scheduleAsyncTask = console.scheduleAsyncTask ?? (() => {});
// @ts-ignore
const startAsyncTask = console.startAsyncTask ?? (() => {});
// @ts-ignore
const finishAsyncTask = console.finishAsyncTask ?? (() => {});
// @ts-ignore
const cancelAsyncTask = console.cancelAsyncTask ?? (() => {});

export interface Task {
  run<T>(f: () => T): T;
}

export function scheduleTask(name: string): Task {
  const id = scheduleAsyncTask(name, true);
  return {
    run(f) {
      try {
        startAsyncTask(id);
        const value = f();
        finishAsyncTask(id);
        return value;
      } catch (e) {
        finishAsyncTask(id);
        throw e;
      }
    },
  };
}
