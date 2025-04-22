import { z } from 'zod';
/**
 * Utility function to handle errors in a type-safe manner
 *
 * @param promise - The promise to execute
 * @param errorsToCatch - Optional list of error types to catch
 * @returns A tuple containing either [undefined, result] on success,
 *          or [error] on failure
 * @template T - Type of the promise result
 * @template E - Type of errors to catch
 */
export  function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {
  // Define schema for success case
  // Tuple contains [undefined, data]
  const successSchema = z.tuple([z.undefined(), z.any() as z.ZodType<T>]);

  // Define schema for error case
  // Tuple contains [error]
  const errorSchema = z.tuple([
    z.instanceof(Error) as z.ZodType<InstanceType<E>>,
  ]);

  return promise
    .then((data) => {
      // Validate and return success case
      // Wrap data in expected format
      const result = [undefined, data] as [undefined, T];
      return successSchema.parse(result);
    })
    .catch((error: unknown) => {
      // If no error types specified, return error as is
      if (!errorsToCatch?.length) {
        return errorSchema.parse([error]);
      }

      // Check if error matches any of the specified types
      // If so, return it in expected format
      if (errorsToCatch.some((ErrorClass) => error instanceof ErrorClass)) {
        return errorSchema.parse([error]);
      }

      // If error doesn't match any specified type
      // Propagate it further up the call chain
      throw error;
    });
}
