
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model cihaz
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type cihaz = $Result.DefaultSelection<Prisma.$cihazPayload>
/**
 * Model olcme
 * This table is a partition table and requires additional setup for migrations. Visit https://pris.ly/d/partition-tables for more info.
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type olcme = $Result.DefaultSelection<Prisma.$olcmePayload>
/**
 * Model sensor_tipi
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type sensor_tipi = $Result.DefaultSelection<Prisma.$sensor_tipiPayload>
/**
 * Model xeberdarliq
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type xeberdarliq = $Result.DefaultSelection<Prisma.$xeberdarliqPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cihazs
 * const cihazs = await prisma.cihaz.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cihazs
   * const cihazs = await prisma.cihaz.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cihaz`: Exposes CRUD operations for the **cihaz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cihazs
    * const cihazs = await prisma.cihaz.findMany()
    * ```
    */
  get cihaz(): Prisma.cihazDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.olcme`: Exposes CRUD operations for the **olcme** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Olcmes
    * const olcmes = await prisma.olcme.findMany()
    * ```
    */
  get olcme(): Prisma.olcmeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sensor_tipi`: Exposes CRUD operations for the **sensor_tipi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sensor_tipis
    * const sensor_tipis = await prisma.sensor_tipi.findMany()
    * ```
    */
  get sensor_tipi(): Prisma.sensor_tipiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.xeberdarliq`: Exposes CRUD operations for the **xeberdarliq** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Xeberdarliqs
    * const xeberdarliqs = await prisma.xeberdarliq.findMany()
    * ```
    */
  get xeberdarliq(): Prisma.xeberdarliqDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    cihaz: 'cihaz',
    olcme: 'olcme',
    sensor_tipi: 'sensor_tipi',
    xeberdarliq: 'xeberdarliq'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cihaz" | "olcme" | "sensor_tipi" | "xeberdarliq"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      cihaz: {
        payload: Prisma.$cihazPayload<ExtArgs>
        fields: Prisma.cihazFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cihazFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cihazFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>
          }
          findFirst: {
            args: Prisma.cihazFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cihazFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>
          }
          findMany: {
            args: Prisma.cihazFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>[]
          }
          create: {
            args: Prisma.cihazCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>
          }
          createMany: {
            args: Prisma.cihazCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cihazCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>[]
          }
          delete: {
            args: Prisma.cihazDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>
          }
          update: {
            args: Prisma.cihazUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>
          }
          deleteMany: {
            args: Prisma.cihazDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cihazUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cihazUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>[]
          }
          upsert: {
            args: Prisma.cihazUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cihazPayload>
          }
          aggregate: {
            args: Prisma.CihazAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCihaz>
          }
          groupBy: {
            args: Prisma.cihazGroupByArgs<ExtArgs>
            result: $Utils.Optional<CihazGroupByOutputType>[]
          }
          count: {
            args: Prisma.cihazCountArgs<ExtArgs>
            result: $Utils.Optional<CihazCountAggregateOutputType> | number
          }
        }
      }
      olcme: {
        payload: Prisma.$olcmePayload<ExtArgs>
        fields: Prisma.olcmeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.olcmeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.olcmeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>
          }
          findFirst: {
            args: Prisma.olcmeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.olcmeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>
          }
          findMany: {
            args: Prisma.olcmeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>[]
          }
          create: {
            args: Prisma.olcmeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>
          }
          createMany: {
            args: Prisma.olcmeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.olcmeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>[]
          }
          delete: {
            args: Prisma.olcmeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>
          }
          update: {
            args: Prisma.olcmeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>
          }
          deleteMany: {
            args: Prisma.olcmeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.olcmeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.olcmeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>[]
          }
          upsert: {
            args: Prisma.olcmeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$olcmePayload>
          }
          aggregate: {
            args: Prisma.OlcmeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOlcme>
          }
          groupBy: {
            args: Prisma.olcmeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OlcmeGroupByOutputType>[]
          }
          count: {
            args: Prisma.olcmeCountArgs<ExtArgs>
            result: $Utils.Optional<OlcmeCountAggregateOutputType> | number
          }
        }
      }
      sensor_tipi: {
        payload: Prisma.$sensor_tipiPayload<ExtArgs>
        fields: Prisma.sensor_tipiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sensor_tipiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sensor_tipiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>
          }
          findFirst: {
            args: Prisma.sensor_tipiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sensor_tipiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>
          }
          findMany: {
            args: Prisma.sensor_tipiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>[]
          }
          create: {
            args: Prisma.sensor_tipiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>
          }
          createMany: {
            args: Prisma.sensor_tipiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sensor_tipiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>[]
          }
          delete: {
            args: Prisma.sensor_tipiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>
          }
          update: {
            args: Prisma.sensor_tipiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>
          }
          deleteMany: {
            args: Prisma.sensor_tipiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sensor_tipiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sensor_tipiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>[]
          }
          upsert: {
            args: Prisma.sensor_tipiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_tipiPayload>
          }
          aggregate: {
            args: Prisma.Sensor_tipiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensor_tipi>
          }
          groupBy: {
            args: Prisma.sensor_tipiGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sensor_tipiGroupByOutputType>[]
          }
          count: {
            args: Prisma.sensor_tipiCountArgs<ExtArgs>
            result: $Utils.Optional<Sensor_tipiCountAggregateOutputType> | number
          }
        }
      }
      xeberdarliq: {
        payload: Prisma.$xeberdarliqPayload<ExtArgs>
        fields: Prisma.xeberdarliqFieldRefs
        operations: {
          findUnique: {
            args: Prisma.xeberdarliqFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.xeberdarliqFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>
          }
          findFirst: {
            args: Prisma.xeberdarliqFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.xeberdarliqFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>
          }
          findMany: {
            args: Prisma.xeberdarliqFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>[]
          }
          create: {
            args: Prisma.xeberdarliqCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>
          }
          createMany: {
            args: Prisma.xeberdarliqCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.xeberdarliqCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>[]
          }
          delete: {
            args: Prisma.xeberdarliqDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>
          }
          update: {
            args: Prisma.xeberdarliqUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>
          }
          deleteMany: {
            args: Prisma.xeberdarliqDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.xeberdarliqUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.xeberdarliqUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>[]
          }
          upsert: {
            args: Prisma.xeberdarliqUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xeberdarliqPayload>
          }
          aggregate: {
            args: Prisma.XeberdarliqAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateXeberdarliq>
          }
          groupBy: {
            args: Prisma.xeberdarliqGroupByArgs<ExtArgs>
            result: $Utils.Optional<XeberdarliqGroupByOutputType>[]
          }
          count: {
            args: Prisma.xeberdarliqCountArgs<ExtArgs>
            result: $Utils.Optional<XeberdarliqCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cihaz?: cihazOmit
    olcme?: olcmeOmit
    sensor_tipi?: sensor_tipiOmit
    xeberdarliq?: xeberdarliqOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CihazCountOutputType
   */

  export type CihazCountOutputType = {
    olcme: number
    xeberdarliq: number
  }

  export type CihazCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    olcme?: boolean | CihazCountOutputTypeCountOlcmeArgs
    xeberdarliq?: boolean | CihazCountOutputTypeCountXeberdarliqArgs
  }

  // Custom InputTypes
  /**
   * CihazCountOutputType without action
   */
  export type CihazCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CihazCountOutputType
     */
    select?: CihazCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CihazCountOutputType without action
   */
  export type CihazCountOutputTypeCountOlcmeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: olcmeWhereInput
  }

  /**
   * CihazCountOutputType without action
   */
  export type CihazCountOutputTypeCountXeberdarliqArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: xeberdarliqWhereInput
  }


  /**
   * Count Type Sensor_tipiCountOutputType
   */

  export type Sensor_tipiCountOutputType = {
    cihaz: number
  }

  export type Sensor_tipiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | Sensor_tipiCountOutputTypeCountCihazArgs
  }

  // Custom InputTypes
  /**
   * Sensor_tipiCountOutputType without action
   */
  export type Sensor_tipiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor_tipiCountOutputType
     */
    select?: Sensor_tipiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Sensor_tipiCountOutputType without action
   */
  export type Sensor_tipiCountOutputTypeCountCihazArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cihazWhereInput
  }


  /**
   * Models
   */

  /**
   * Model cihaz
   */

  export type AggregateCihaz = {
    _count: CihazCountAggregateOutputType | null
    _min: CihazMinAggregateOutputType | null
    _max: CihazMaxAggregateOutputType | null
  }

  export type CihazMinAggregateOutputType = {
    kod: string | null
    sensorTipiKod: string | null
    ad: string | null
    yer: string | null
    status: string | null
    qurasdirilma: Date | null
    yaradilma: Date | null
  }

  export type CihazMaxAggregateOutputType = {
    kod: string | null
    sensorTipiKod: string | null
    ad: string | null
    yer: string | null
    status: string | null
    qurasdirilma: Date | null
    yaradilma: Date | null
  }

  export type CihazCountAggregateOutputType = {
    kod: number
    sensorTipiKod: number
    ad: number
    yer: number
    status: number
    qurasdirilma: number
    yaradilma: number
    _all: number
  }


  export type CihazMinAggregateInputType = {
    kod?: true
    sensorTipiKod?: true
    ad?: true
    yer?: true
    status?: true
    qurasdirilma?: true
    yaradilma?: true
  }

  export type CihazMaxAggregateInputType = {
    kod?: true
    sensorTipiKod?: true
    ad?: true
    yer?: true
    status?: true
    qurasdirilma?: true
    yaradilma?: true
  }

  export type CihazCountAggregateInputType = {
    kod?: true
    sensorTipiKod?: true
    ad?: true
    yer?: true
    status?: true
    qurasdirilma?: true
    yaradilma?: true
    _all?: true
  }

  export type CihazAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cihaz to aggregate.
     */
    where?: cihazWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cihazs to fetch.
     */
    orderBy?: cihazOrderByWithRelationInput | cihazOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cihazWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cihazs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cihazs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cihazs
    **/
    _count?: true | CihazCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CihazMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CihazMaxAggregateInputType
  }

  export type GetCihazAggregateType<T extends CihazAggregateArgs> = {
        [P in keyof T & keyof AggregateCihaz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCihaz[P]>
      : GetScalarType<T[P], AggregateCihaz[P]>
  }




  export type cihazGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cihazWhereInput
    orderBy?: cihazOrderByWithAggregationInput | cihazOrderByWithAggregationInput[]
    by: CihazScalarFieldEnum[] | CihazScalarFieldEnum
    having?: cihazScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CihazCountAggregateInputType | true
    _min?: CihazMinAggregateInputType
    _max?: CihazMaxAggregateInputType
  }

  export type CihazGroupByOutputType = {
    kod: string
    sensorTipiKod: string
    ad: string
    yer: string | null
    status: string
    qurasdirilma: Date | null
    yaradilma: Date
    _count: CihazCountAggregateOutputType | null
    _min: CihazMinAggregateOutputType | null
    _max: CihazMaxAggregateOutputType | null
  }

  type GetCihazGroupByPayload<T extends cihazGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CihazGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CihazGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CihazGroupByOutputType[P]>
            : GetScalarType<T[P], CihazGroupByOutputType[P]>
        }
      >
    >


  export type cihazSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    kod?: boolean
    sensorTipiKod?: boolean
    ad?: boolean
    yer?: boolean
    status?: boolean
    qurasdirilma?: boolean
    yaradilma?: boolean
    sensorTipi?: boolean | sensor_tipiDefaultArgs<ExtArgs>
    olcme?: boolean | cihaz$olcmeArgs<ExtArgs>
    xeberdarliq?: boolean | cihaz$xeberdarliqArgs<ExtArgs>
    _count?: boolean | CihazCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cihaz"]>

  export type cihazSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    kod?: boolean
    sensorTipiKod?: boolean
    ad?: boolean
    yer?: boolean
    status?: boolean
    qurasdirilma?: boolean
    yaradilma?: boolean
    sensorTipi?: boolean | sensor_tipiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cihaz"]>

  export type cihazSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    kod?: boolean
    sensorTipiKod?: boolean
    ad?: boolean
    yer?: boolean
    status?: boolean
    qurasdirilma?: boolean
    yaradilma?: boolean
    sensorTipi?: boolean | sensor_tipiDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cihaz"]>

  export type cihazSelectScalar = {
    kod?: boolean
    sensorTipiKod?: boolean
    ad?: boolean
    yer?: boolean
    status?: boolean
    qurasdirilma?: boolean
    yaradilma?: boolean
  }

  export type cihazOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"kod" | "sensorTipiKod" | "ad" | "yer" | "status" | "qurasdirilma" | "yaradilma", ExtArgs["result"]["cihaz"]>
  export type cihazInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensorTipi?: boolean | sensor_tipiDefaultArgs<ExtArgs>
    olcme?: boolean | cihaz$olcmeArgs<ExtArgs>
    xeberdarliq?: boolean | cihaz$xeberdarliqArgs<ExtArgs>
    _count?: boolean | CihazCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type cihazIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensorTipi?: boolean | sensor_tipiDefaultArgs<ExtArgs>
  }
  export type cihazIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensorTipi?: boolean | sensor_tipiDefaultArgs<ExtArgs>
  }

  export type $cihazPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cihaz"
    objects: {
      sensorTipi: Prisma.$sensor_tipiPayload<ExtArgs>
      olcme: Prisma.$olcmePayload<ExtArgs>[]
      xeberdarliq: Prisma.$xeberdarliqPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      kod: string
      sensorTipiKod: string
      ad: string
      yer: string | null
      status: string
      qurasdirilma: Date | null
      yaradilma: Date
    }, ExtArgs["result"]["cihaz"]>
    composites: {}
  }

  type cihazGetPayload<S extends boolean | null | undefined | cihazDefaultArgs> = $Result.GetResult<Prisma.$cihazPayload, S>

  type cihazCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cihazFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CihazCountAggregateInputType | true
    }

  export interface cihazDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cihaz'], meta: { name: 'cihaz' } }
    /**
     * Find zero or one Cihaz that matches the filter.
     * @param {cihazFindUniqueArgs} args - Arguments to find a Cihaz
     * @example
     * // Get one Cihaz
     * const cihaz = await prisma.cihaz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cihazFindUniqueArgs>(args: SelectSubset<T, cihazFindUniqueArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cihaz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cihazFindUniqueOrThrowArgs} args - Arguments to find a Cihaz
     * @example
     * // Get one Cihaz
     * const cihaz = await prisma.cihaz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cihazFindUniqueOrThrowArgs>(args: SelectSubset<T, cihazFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cihaz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cihazFindFirstArgs} args - Arguments to find a Cihaz
     * @example
     * // Get one Cihaz
     * const cihaz = await prisma.cihaz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cihazFindFirstArgs>(args?: SelectSubset<T, cihazFindFirstArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cihaz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cihazFindFirstOrThrowArgs} args - Arguments to find a Cihaz
     * @example
     * // Get one Cihaz
     * const cihaz = await prisma.cihaz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cihazFindFirstOrThrowArgs>(args?: SelectSubset<T, cihazFindFirstOrThrowArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cihazs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cihazFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cihazs
     * const cihazs = await prisma.cihaz.findMany()
     * 
     * // Get first 10 Cihazs
     * const cihazs = await prisma.cihaz.findMany({ take: 10 })
     * 
     * // Only select the `kod`
     * const cihazWithKodOnly = await prisma.cihaz.findMany({ select: { kod: true } })
     * 
     */
    findMany<T extends cihazFindManyArgs>(args?: SelectSubset<T, cihazFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cihaz.
     * @param {cihazCreateArgs} args - Arguments to create a Cihaz.
     * @example
     * // Create one Cihaz
     * const Cihaz = await prisma.cihaz.create({
     *   data: {
     *     // ... data to create a Cihaz
     *   }
     * })
     * 
     */
    create<T extends cihazCreateArgs>(args: SelectSubset<T, cihazCreateArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cihazs.
     * @param {cihazCreateManyArgs} args - Arguments to create many Cihazs.
     * @example
     * // Create many Cihazs
     * const cihaz = await prisma.cihaz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cihazCreateManyArgs>(args?: SelectSubset<T, cihazCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cihazs and returns the data saved in the database.
     * @param {cihazCreateManyAndReturnArgs} args - Arguments to create many Cihazs.
     * @example
     * // Create many Cihazs
     * const cihaz = await prisma.cihaz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cihazs and only return the `kod`
     * const cihazWithKodOnly = await prisma.cihaz.createManyAndReturn({
     *   select: { kod: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cihazCreateManyAndReturnArgs>(args?: SelectSubset<T, cihazCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cihaz.
     * @param {cihazDeleteArgs} args - Arguments to delete one Cihaz.
     * @example
     * // Delete one Cihaz
     * const Cihaz = await prisma.cihaz.delete({
     *   where: {
     *     // ... filter to delete one Cihaz
     *   }
     * })
     * 
     */
    delete<T extends cihazDeleteArgs>(args: SelectSubset<T, cihazDeleteArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cihaz.
     * @param {cihazUpdateArgs} args - Arguments to update one Cihaz.
     * @example
     * // Update one Cihaz
     * const cihaz = await prisma.cihaz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cihazUpdateArgs>(args: SelectSubset<T, cihazUpdateArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cihazs.
     * @param {cihazDeleteManyArgs} args - Arguments to filter Cihazs to delete.
     * @example
     * // Delete a few Cihazs
     * const { count } = await prisma.cihaz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cihazDeleteManyArgs>(args?: SelectSubset<T, cihazDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cihazs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cihazUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cihazs
     * const cihaz = await prisma.cihaz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cihazUpdateManyArgs>(args: SelectSubset<T, cihazUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cihazs and returns the data updated in the database.
     * @param {cihazUpdateManyAndReturnArgs} args - Arguments to update many Cihazs.
     * @example
     * // Update many Cihazs
     * const cihaz = await prisma.cihaz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cihazs and only return the `kod`
     * const cihazWithKodOnly = await prisma.cihaz.updateManyAndReturn({
     *   select: { kod: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cihazUpdateManyAndReturnArgs>(args: SelectSubset<T, cihazUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cihaz.
     * @param {cihazUpsertArgs} args - Arguments to update or create a Cihaz.
     * @example
     * // Update or create a Cihaz
     * const cihaz = await prisma.cihaz.upsert({
     *   create: {
     *     // ... data to create a Cihaz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cihaz we want to update
     *   }
     * })
     */
    upsert<T extends cihazUpsertArgs>(args: SelectSubset<T, cihazUpsertArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cihazs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cihazCountArgs} args - Arguments to filter Cihazs to count.
     * @example
     * // Count the number of Cihazs
     * const count = await prisma.cihaz.count({
     *   where: {
     *     // ... the filter for the Cihazs we want to count
     *   }
     * })
    **/
    count<T extends cihazCountArgs>(
      args?: Subset<T, cihazCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CihazCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cihaz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CihazAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CihazAggregateArgs>(args: Subset<T, CihazAggregateArgs>): Prisma.PrismaPromise<GetCihazAggregateType<T>>

    /**
     * Group by Cihaz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cihazGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cihazGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cihazGroupByArgs['orderBy'] }
        : { orderBy?: cihazGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cihazGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCihazGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cihaz model
   */
  readonly fields: cihazFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cihaz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cihazClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sensorTipi<T extends sensor_tipiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sensor_tipiDefaultArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    olcme<T extends cihaz$olcmeArgs<ExtArgs> = {}>(args?: Subset<T, cihaz$olcmeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    xeberdarliq<T extends cihaz$xeberdarliqArgs<ExtArgs> = {}>(args?: Subset<T, cihaz$xeberdarliqArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cihaz model
   */
  interface cihazFieldRefs {
    readonly kod: FieldRef<"cihaz", 'String'>
    readonly sensorTipiKod: FieldRef<"cihaz", 'String'>
    readonly ad: FieldRef<"cihaz", 'String'>
    readonly yer: FieldRef<"cihaz", 'String'>
    readonly status: FieldRef<"cihaz", 'String'>
    readonly qurasdirilma: FieldRef<"cihaz", 'DateTime'>
    readonly yaradilma: FieldRef<"cihaz", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * cihaz findUnique
   */
  export type cihazFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * Filter, which cihaz to fetch.
     */
    where: cihazWhereUniqueInput
  }

  /**
   * cihaz findUniqueOrThrow
   */
  export type cihazFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * Filter, which cihaz to fetch.
     */
    where: cihazWhereUniqueInput
  }

  /**
   * cihaz findFirst
   */
  export type cihazFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * Filter, which cihaz to fetch.
     */
    where?: cihazWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cihazs to fetch.
     */
    orderBy?: cihazOrderByWithRelationInput | cihazOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cihazs.
     */
    cursor?: cihazWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cihazs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cihazs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cihazs.
     */
    distinct?: CihazScalarFieldEnum | CihazScalarFieldEnum[]
  }

  /**
   * cihaz findFirstOrThrow
   */
  export type cihazFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * Filter, which cihaz to fetch.
     */
    where?: cihazWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cihazs to fetch.
     */
    orderBy?: cihazOrderByWithRelationInput | cihazOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cihazs.
     */
    cursor?: cihazWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cihazs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cihazs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cihazs.
     */
    distinct?: CihazScalarFieldEnum | CihazScalarFieldEnum[]
  }

  /**
   * cihaz findMany
   */
  export type cihazFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * Filter, which cihazs to fetch.
     */
    where?: cihazWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cihazs to fetch.
     */
    orderBy?: cihazOrderByWithRelationInput | cihazOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cihazs.
     */
    cursor?: cihazWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cihazs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cihazs.
     */
    skip?: number
    distinct?: CihazScalarFieldEnum | CihazScalarFieldEnum[]
  }

  /**
   * cihaz create
   */
  export type cihazCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * The data needed to create a cihaz.
     */
    data: XOR<cihazCreateInput, cihazUncheckedCreateInput>
  }

  /**
   * cihaz createMany
   */
  export type cihazCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cihazs.
     */
    data: cihazCreateManyInput | cihazCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cihaz createManyAndReturn
   */
  export type cihazCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * The data used to create many cihazs.
     */
    data: cihazCreateManyInput | cihazCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * cihaz update
   */
  export type cihazUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * The data needed to update a cihaz.
     */
    data: XOR<cihazUpdateInput, cihazUncheckedUpdateInput>
    /**
     * Choose, which cihaz to update.
     */
    where: cihazWhereUniqueInput
  }

  /**
   * cihaz updateMany
   */
  export type cihazUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cihazs.
     */
    data: XOR<cihazUpdateManyMutationInput, cihazUncheckedUpdateManyInput>
    /**
     * Filter which cihazs to update
     */
    where?: cihazWhereInput
    /**
     * Limit how many cihazs to update.
     */
    limit?: number
  }

  /**
   * cihaz updateManyAndReturn
   */
  export type cihazUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * The data used to update cihazs.
     */
    data: XOR<cihazUpdateManyMutationInput, cihazUncheckedUpdateManyInput>
    /**
     * Filter which cihazs to update
     */
    where?: cihazWhereInput
    /**
     * Limit how many cihazs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * cihaz upsert
   */
  export type cihazUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * The filter to search for the cihaz to update in case it exists.
     */
    where: cihazWhereUniqueInput
    /**
     * In case the cihaz found by the `where` argument doesn't exist, create a new cihaz with this data.
     */
    create: XOR<cihazCreateInput, cihazUncheckedCreateInput>
    /**
     * In case the cihaz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cihazUpdateInput, cihazUncheckedUpdateInput>
  }

  /**
   * cihaz delete
   */
  export type cihazDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    /**
     * Filter which cihaz to delete.
     */
    where: cihazWhereUniqueInput
  }

  /**
   * cihaz deleteMany
   */
  export type cihazDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cihazs to delete
     */
    where?: cihazWhereInput
    /**
     * Limit how many cihazs to delete.
     */
    limit?: number
  }

  /**
   * cihaz.olcme
   */
  export type cihaz$olcmeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    where?: olcmeWhereInput
    orderBy?: olcmeOrderByWithRelationInput | olcmeOrderByWithRelationInput[]
    cursor?: olcmeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OlcmeScalarFieldEnum | OlcmeScalarFieldEnum[]
  }

  /**
   * cihaz.xeberdarliq
   */
  export type cihaz$xeberdarliqArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    where?: xeberdarliqWhereInput
    orderBy?: xeberdarliqOrderByWithRelationInput | xeberdarliqOrderByWithRelationInput[]
    cursor?: xeberdarliqWhereUniqueInput
    take?: number
    skip?: number
    distinct?: XeberdarliqScalarFieldEnum | XeberdarliqScalarFieldEnum[]
  }

  /**
   * cihaz without action
   */
  export type cihazDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
  }


  /**
   * Model olcme
   */

  export type AggregateOlcme = {
    _count: OlcmeCountAggregateOutputType | null
    _avg: OlcmeAvgAggregateOutputType | null
    _sum: OlcmeSumAggregateOutputType | null
    _min: OlcmeMinAggregateOutputType | null
    _max: OlcmeMaxAggregateOutputType | null
  }

  export type OlcmeAvgAggregateOutputType = {
    id: number | null
    qiymet: Decimal | null
    keyfiyyet: number | null
    syncStatus: number | null
  }

  export type OlcmeSumAggregateOutputType = {
    id: bigint | null
    qiymet: Decimal | null
    keyfiyyet: number | null
    syncStatus: number | null
  }

  export type OlcmeMinAggregateOutputType = {
    id: bigint | null
    cihazKod: string | null
    olcmeVaxti: Date | null
    qiymet: Decimal | null
    keyfiyyet: number | null
    syncStatus: number | null
    yaradilma: Date | null
  }

  export type OlcmeMaxAggregateOutputType = {
    id: bigint | null
    cihazKod: string | null
    olcmeVaxti: Date | null
    qiymet: Decimal | null
    keyfiyyet: number | null
    syncStatus: number | null
    yaradilma: Date | null
  }

  export type OlcmeCountAggregateOutputType = {
    id: number
    cihazKod: number
    olcmeVaxti: number
    qiymet: number
    keyfiyyet: number
    syncStatus: number
    yaradilma: number
    _all: number
  }


  export type OlcmeAvgAggregateInputType = {
    id?: true
    qiymet?: true
    keyfiyyet?: true
    syncStatus?: true
  }

  export type OlcmeSumAggregateInputType = {
    id?: true
    qiymet?: true
    keyfiyyet?: true
    syncStatus?: true
  }

  export type OlcmeMinAggregateInputType = {
    id?: true
    cihazKod?: true
    olcmeVaxti?: true
    qiymet?: true
    keyfiyyet?: true
    syncStatus?: true
    yaradilma?: true
  }

  export type OlcmeMaxAggregateInputType = {
    id?: true
    cihazKod?: true
    olcmeVaxti?: true
    qiymet?: true
    keyfiyyet?: true
    syncStatus?: true
    yaradilma?: true
  }

  export type OlcmeCountAggregateInputType = {
    id?: true
    cihazKod?: true
    olcmeVaxti?: true
    qiymet?: true
    keyfiyyet?: true
    syncStatus?: true
    yaradilma?: true
    _all?: true
  }

  export type OlcmeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which olcme to aggregate.
     */
    where?: olcmeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of olcmes to fetch.
     */
    orderBy?: olcmeOrderByWithRelationInput | olcmeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: olcmeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` olcmes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` olcmes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned olcmes
    **/
    _count?: true | OlcmeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OlcmeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OlcmeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OlcmeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OlcmeMaxAggregateInputType
  }

  export type GetOlcmeAggregateType<T extends OlcmeAggregateArgs> = {
        [P in keyof T & keyof AggregateOlcme]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOlcme[P]>
      : GetScalarType<T[P], AggregateOlcme[P]>
  }




  export type olcmeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: olcmeWhereInput
    orderBy?: olcmeOrderByWithAggregationInput | olcmeOrderByWithAggregationInput[]
    by: OlcmeScalarFieldEnum[] | OlcmeScalarFieldEnum
    having?: olcmeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OlcmeCountAggregateInputType | true
    _avg?: OlcmeAvgAggregateInputType
    _sum?: OlcmeSumAggregateInputType
    _min?: OlcmeMinAggregateInputType
    _max?: OlcmeMaxAggregateInputType
  }

  export type OlcmeGroupByOutputType = {
    id: bigint
    cihazKod: string
    olcmeVaxti: Date
    qiymet: Decimal
    keyfiyyet: number
    syncStatus: number
    yaradilma: Date
    _count: OlcmeCountAggregateOutputType | null
    _avg: OlcmeAvgAggregateOutputType | null
    _sum: OlcmeSumAggregateOutputType | null
    _min: OlcmeMinAggregateOutputType | null
    _max: OlcmeMaxAggregateOutputType | null
  }

  type GetOlcmeGroupByPayload<T extends olcmeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OlcmeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OlcmeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OlcmeGroupByOutputType[P]>
            : GetScalarType<T[P], OlcmeGroupByOutputType[P]>
        }
      >
    >


  export type olcmeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    keyfiyyet?: boolean
    syncStatus?: boolean
    yaradilma?: boolean
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["olcme"]>

  export type olcmeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    keyfiyyet?: boolean
    syncStatus?: boolean
    yaradilma?: boolean
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["olcme"]>

  export type olcmeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    keyfiyyet?: boolean
    syncStatus?: boolean
    yaradilma?: boolean
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["olcme"]>

  export type olcmeSelectScalar = {
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    keyfiyyet?: boolean
    syncStatus?: boolean
    yaradilma?: boolean
  }

  export type olcmeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cihazKod" | "olcmeVaxti" | "qiymet" | "keyfiyyet" | "syncStatus" | "yaradilma", ExtArgs["result"]["olcme"]>
  export type olcmeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }
  export type olcmeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }
  export type olcmeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }

  export type $olcmePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "olcme"
    objects: {
      cihaz: Prisma.$cihazPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      cihazKod: string
      olcmeVaxti: Date
      qiymet: Prisma.Decimal
      keyfiyyet: number
      syncStatus: number
      yaradilma: Date
    }, ExtArgs["result"]["olcme"]>
    composites: {}
  }

  type olcmeGetPayload<S extends boolean | null | undefined | olcmeDefaultArgs> = $Result.GetResult<Prisma.$olcmePayload, S>

  type olcmeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<olcmeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OlcmeCountAggregateInputType | true
    }

  export interface olcmeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['olcme'], meta: { name: 'olcme' } }
    /**
     * Find zero or one Olcme that matches the filter.
     * @param {olcmeFindUniqueArgs} args - Arguments to find a Olcme
     * @example
     * // Get one Olcme
     * const olcme = await prisma.olcme.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends olcmeFindUniqueArgs>(args: SelectSubset<T, olcmeFindUniqueArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Olcme that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {olcmeFindUniqueOrThrowArgs} args - Arguments to find a Olcme
     * @example
     * // Get one Olcme
     * const olcme = await prisma.olcme.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends olcmeFindUniqueOrThrowArgs>(args: SelectSubset<T, olcmeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Olcme that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {olcmeFindFirstArgs} args - Arguments to find a Olcme
     * @example
     * // Get one Olcme
     * const olcme = await prisma.olcme.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends olcmeFindFirstArgs>(args?: SelectSubset<T, olcmeFindFirstArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Olcme that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {olcmeFindFirstOrThrowArgs} args - Arguments to find a Olcme
     * @example
     * // Get one Olcme
     * const olcme = await prisma.olcme.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends olcmeFindFirstOrThrowArgs>(args?: SelectSubset<T, olcmeFindFirstOrThrowArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Olcmes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {olcmeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Olcmes
     * const olcmes = await prisma.olcme.findMany()
     * 
     * // Get first 10 Olcmes
     * const olcmes = await prisma.olcme.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const olcmeWithIdOnly = await prisma.olcme.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends olcmeFindManyArgs>(args?: SelectSubset<T, olcmeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Olcme.
     * @param {olcmeCreateArgs} args - Arguments to create a Olcme.
     * @example
     * // Create one Olcme
     * const Olcme = await prisma.olcme.create({
     *   data: {
     *     // ... data to create a Olcme
     *   }
     * })
     * 
     */
    create<T extends olcmeCreateArgs>(args: SelectSubset<T, olcmeCreateArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Olcmes.
     * @param {olcmeCreateManyArgs} args - Arguments to create many Olcmes.
     * @example
     * // Create many Olcmes
     * const olcme = await prisma.olcme.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends olcmeCreateManyArgs>(args?: SelectSubset<T, olcmeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Olcmes and returns the data saved in the database.
     * @param {olcmeCreateManyAndReturnArgs} args - Arguments to create many Olcmes.
     * @example
     * // Create many Olcmes
     * const olcme = await prisma.olcme.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Olcmes and only return the `id`
     * const olcmeWithIdOnly = await prisma.olcme.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends olcmeCreateManyAndReturnArgs>(args?: SelectSubset<T, olcmeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Olcme.
     * @param {olcmeDeleteArgs} args - Arguments to delete one Olcme.
     * @example
     * // Delete one Olcme
     * const Olcme = await prisma.olcme.delete({
     *   where: {
     *     // ... filter to delete one Olcme
     *   }
     * })
     * 
     */
    delete<T extends olcmeDeleteArgs>(args: SelectSubset<T, olcmeDeleteArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Olcme.
     * @param {olcmeUpdateArgs} args - Arguments to update one Olcme.
     * @example
     * // Update one Olcme
     * const olcme = await prisma.olcme.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends olcmeUpdateArgs>(args: SelectSubset<T, olcmeUpdateArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Olcmes.
     * @param {olcmeDeleteManyArgs} args - Arguments to filter Olcmes to delete.
     * @example
     * // Delete a few Olcmes
     * const { count } = await prisma.olcme.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends olcmeDeleteManyArgs>(args?: SelectSubset<T, olcmeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Olcmes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {olcmeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Olcmes
     * const olcme = await prisma.olcme.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends olcmeUpdateManyArgs>(args: SelectSubset<T, olcmeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Olcmes and returns the data updated in the database.
     * @param {olcmeUpdateManyAndReturnArgs} args - Arguments to update many Olcmes.
     * @example
     * // Update many Olcmes
     * const olcme = await prisma.olcme.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Olcmes and only return the `id`
     * const olcmeWithIdOnly = await prisma.olcme.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends olcmeUpdateManyAndReturnArgs>(args: SelectSubset<T, olcmeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Olcme.
     * @param {olcmeUpsertArgs} args - Arguments to update or create a Olcme.
     * @example
     * // Update or create a Olcme
     * const olcme = await prisma.olcme.upsert({
     *   create: {
     *     // ... data to create a Olcme
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Olcme we want to update
     *   }
     * })
     */
    upsert<T extends olcmeUpsertArgs>(args: SelectSubset<T, olcmeUpsertArgs<ExtArgs>>): Prisma__olcmeClient<$Result.GetResult<Prisma.$olcmePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Olcmes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {olcmeCountArgs} args - Arguments to filter Olcmes to count.
     * @example
     * // Count the number of Olcmes
     * const count = await prisma.olcme.count({
     *   where: {
     *     // ... the filter for the Olcmes we want to count
     *   }
     * })
    **/
    count<T extends olcmeCountArgs>(
      args?: Subset<T, olcmeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OlcmeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Olcme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OlcmeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OlcmeAggregateArgs>(args: Subset<T, OlcmeAggregateArgs>): Prisma.PrismaPromise<GetOlcmeAggregateType<T>>

    /**
     * Group by Olcme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {olcmeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends olcmeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: olcmeGroupByArgs['orderBy'] }
        : { orderBy?: olcmeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, olcmeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOlcmeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the olcme model
   */
  readonly fields: olcmeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for olcme.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__olcmeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cihaz<T extends cihazDefaultArgs<ExtArgs> = {}>(args?: Subset<T, cihazDefaultArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the olcme model
   */
  interface olcmeFieldRefs {
    readonly id: FieldRef<"olcme", 'BigInt'>
    readonly cihazKod: FieldRef<"olcme", 'String'>
    readonly olcmeVaxti: FieldRef<"olcme", 'DateTime'>
    readonly qiymet: FieldRef<"olcme", 'Decimal'>
    readonly keyfiyyet: FieldRef<"olcme", 'Int'>
    readonly syncStatus: FieldRef<"olcme", 'Int'>
    readonly yaradilma: FieldRef<"olcme", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * olcme findUnique
   */
  export type olcmeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * Filter, which olcme to fetch.
     */
    where: olcmeWhereUniqueInput
  }

  /**
   * olcme findUniqueOrThrow
   */
  export type olcmeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * Filter, which olcme to fetch.
     */
    where: olcmeWhereUniqueInput
  }

  /**
   * olcme findFirst
   */
  export type olcmeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * Filter, which olcme to fetch.
     */
    where?: olcmeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of olcmes to fetch.
     */
    orderBy?: olcmeOrderByWithRelationInput | olcmeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for olcmes.
     */
    cursor?: olcmeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` olcmes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` olcmes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of olcmes.
     */
    distinct?: OlcmeScalarFieldEnum | OlcmeScalarFieldEnum[]
  }

  /**
   * olcme findFirstOrThrow
   */
  export type olcmeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * Filter, which olcme to fetch.
     */
    where?: olcmeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of olcmes to fetch.
     */
    orderBy?: olcmeOrderByWithRelationInput | olcmeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for olcmes.
     */
    cursor?: olcmeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` olcmes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` olcmes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of olcmes.
     */
    distinct?: OlcmeScalarFieldEnum | OlcmeScalarFieldEnum[]
  }

  /**
   * olcme findMany
   */
  export type olcmeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * Filter, which olcmes to fetch.
     */
    where?: olcmeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of olcmes to fetch.
     */
    orderBy?: olcmeOrderByWithRelationInput | olcmeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing olcmes.
     */
    cursor?: olcmeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` olcmes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` olcmes.
     */
    skip?: number
    distinct?: OlcmeScalarFieldEnum | OlcmeScalarFieldEnum[]
  }

  /**
   * olcme create
   */
  export type olcmeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * The data needed to create a olcme.
     */
    data: XOR<olcmeCreateInput, olcmeUncheckedCreateInput>
  }

  /**
   * olcme createMany
   */
  export type olcmeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many olcmes.
     */
    data: olcmeCreateManyInput | olcmeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * olcme createManyAndReturn
   */
  export type olcmeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * The data used to create many olcmes.
     */
    data: olcmeCreateManyInput | olcmeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * olcme update
   */
  export type olcmeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * The data needed to update a olcme.
     */
    data: XOR<olcmeUpdateInput, olcmeUncheckedUpdateInput>
    /**
     * Choose, which olcme to update.
     */
    where: olcmeWhereUniqueInput
  }

  /**
   * olcme updateMany
   */
  export type olcmeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update olcmes.
     */
    data: XOR<olcmeUpdateManyMutationInput, olcmeUncheckedUpdateManyInput>
    /**
     * Filter which olcmes to update
     */
    where?: olcmeWhereInput
    /**
     * Limit how many olcmes to update.
     */
    limit?: number
  }

  /**
   * olcme updateManyAndReturn
   */
  export type olcmeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * The data used to update olcmes.
     */
    data: XOR<olcmeUpdateManyMutationInput, olcmeUncheckedUpdateManyInput>
    /**
     * Filter which olcmes to update
     */
    where?: olcmeWhereInput
    /**
     * Limit how many olcmes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * olcme upsert
   */
  export type olcmeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * The filter to search for the olcme to update in case it exists.
     */
    where: olcmeWhereUniqueInput
    /**
     * In case the olcme found by the `where` argument doesn't exist, create a new olcme with this data.
     */
    create: XOR<olcmeCreateInput, olcmeUncheckedCreateInput>
    /**
     * In case the olcme was found with the provided `where` argument, update it with this data.
     */
    update: XOR<olcmeUpdateInput, olcmeUncheckedUpdateInput>
  }

  /**
   * olcme delete
   */
  export type olcmeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
    /**
     * Filter which olcme to delete.
     */
    where: olcmeWhereUniqueInput
  }

  /**
   * olcme deleteMany
   */
  export type olcmeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which olcmes to delete
     */
    where?: olcmeWhereInput
    /**
     * Limit how many olcmes to delete.
     */
    limit?: number
  }

  /**
   * olcme without action
   */
  export type olcmeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the olcme
     */
    select?: olcmeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the olcme
     */
    omit?: olcmeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: olcmeInclude<ExtArgs> | null
  }


  /**
   * Model sensor_tipi
   */

  export type AggregateSensor_tipi = {
    _count: Sensor_tipiCountAggregateOutputType | null
    _avg: Sensor_tipiAvgAggregateOutputType | null
    _sum: Sensor_tipiSumAggregateOutputType | null
    _min: Sensor_tipiMinAggregateOutputType | null
    _max: Sensor_tipiMaxAggregateOutputType | null
  }

  export type Sensor_tipiAvgAggregateOutputType = {
    minHedd: Decimal | null
    maxHedd: Decimal | null
  }

  export type Sensor_tipiSumAggregateOutputType = {
    minHedd: Decimal | null
    maxHedd: Decimal | null
  }

  export type Sensor_tipiMinAggregateOutputType = {
    kod: string | null
    ad: string | null
    vahid: string | null
    minHedd: Decimal | null
    maxHedd: Decimal | null
    tesvir: string | null
    yaradilma: Date | null
  }

  export type Sensor_tipiMaxAggregateOutputType = {
    kod: string | null
    ad: string | null
    vahid: string | null
    minHedd: Decimal | null
    maxHedd: Decimal | null
    tesvir: string | null
    yaradilma: Date | null
  }

  export type Sensor_tipiCountAggregateOutputType = {
    kod: number
    ad: number
    vahid: number
    minHedd: number
    maxHedd: number
    tesvir: number
    yaradilma: number
    _all: number
  }


  export type Sensor_tipiAvgAggregateInputType = {
    minHedd?: true
    maxHedd?: true
  }

  export type Sensor_tipiSumAggregateInputType = {
    minHedd?: true
    maxHedd?: true
  }

  export type Sensor_tipiMinAggregateInputType = {
    kod?: true
    ad?: true
    vahid?: true
    minHedd?: true
    maxHedd?: true
    tesvir?: true
    yaradilma?: true
  }

  export type Sensor_tipiMaxAggregateInputType = {
    kod?: true
    ad?: true
    vahid?: true
    minHedd?: true
    maxHedd?: true
    tesvir?: true
    yaradilma?: true
  }

  export type Sensor_tipiCountAggregateInputType = {
    kod?: true
    ad?: true
    vahid?: true
    minHedd?: true
    maxHedd?: true
    tesvir?: true
    yaradilma?: true
    _all?: true
  }

  export type Sensor_tipiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sensor_tipi to aggregate.
     */
    where?: sensor_tipiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_tipis to fetch.
     */
    orderBy?: sensor_tipiOrderByWithRelationInput | sensor_tipiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sensor_tipiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_tipis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_tipis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sensor_tipis
    **/
    _count?: true | Sensor_tipiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sensor_tipiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sensor_tipiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sensor_tipiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sensor_tipiMaxAggregateInputType
  }

  export type GetSensor_tipiAggregateType<T extends Sensor_tipiAggregateArgs> = {
        [P in keyof T & keyof AggregateSensor_tipi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensor_tipi[P]>
      : GetScalarType<T[P], AggregateSensor_tipi[P]>
  }




  export type sensor_tipiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensor_tipiWhereInput
    orderBy?: sensor_tipiOrderByWithAggregationInput | sensor_tipiOrderByWithAggregationInput[]
    by: Sensor_tipiScalarFieldEnum[] | Sensor_tipiScalarFieldEnum
    having?: sensor_tipiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sensor_tipiCountAggregateInputType | true
    _avg?: Sensor_tipiAvgAggregateInputType
    _sum?: Sensor_tipiSumAggregateInputType
    _min?: Sensor_tipiMinAggregateInputType
    _max?: Sensor_tipiMaxAggregateInputType
  }

  export type Sensor_tipiGroupByOutputType = {
    kod: string
    ad: string
    vahid: string
    minHedd: Decimal | null
    maxHedd: Decimal | null
    tesvir: string | null
    yaradilma: Date
    _count: Sensor_tipiCountAggregateOutputType | null
    _avg: Sensor_tipiAvgAggregateOutputType | null
    _sum: Sensor_tipiSumAggregateOutputType | null
    _min: Sensor_tipiMinAggregateOutputType | null
    _max: Sensor_tipiMaxAggregateOutputType | null
  }

  type GetSensor_tipiGroupByPayload<T extends sensor_tipiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sensor_tipiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sensor_tipiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sensor_tipiGroupByOutputType[P]>
            : GetScalarType<T[P], Sensor_tipiGroupByOutputType[P]>
        }
      >
    >


  export type sensor_tipiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    kod?: boolean
    ad?: boolean
    vahid?: boolean
    minHedd?: boolean
    maxHedd?: boolean
    tesvir?: boolean
    yaradilma?: boolean
    cihaz?: boolean | sensor_tipi$cihazArgs<ExtArgs>
    _count?: boolean | Sensor_tipiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensor_tipi"]>

  export type sensor_tipiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    kod?: boolean
    ad?: boolean
    vahid?: boolean
    minHedd?: boolean
    maxHedd?: boolean
    tesvir?: boolean
    yaradilma?: boolean
  }, ExtArgs["result"]["sensor_tipi"]>

  export type sensor_tipiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    kod?: boolean
    ad?: boolean
    vahid?: boolean
    minHedd?: boolean
    maxHedd?: boolean
    tesvir?: boolean
    yaradilma?: boolean
  }, ExtArgs["result"]["sensor_tipi"]>

  export type sensor_tipiSelectScalar = {
    kod?: boolean
    ad?: boolean
    vahid?: boolean
    minHedd?: boolean
    maxHedd?: boolean
    tesvir?: boolean
    yaradilma?: boolean
  }

  export type sensor_tipiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"kod" | "ad" | "vahid" | "minHedd" | "maxHedd" | "tesvir" | "yaradilma", ExtArgs["result"]["sensor_tipi"]>
  export type sensor_tipiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | sensor_tipi$cihazArgs<ExtArgs>
    _count?: boolean | Sensor_tipiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sensor_tipiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type sensor_tipiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $sensor_tipiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sensor_tipi"
    objects: {
      cihaz: Prisma.$cihazPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      kod: string
      ad: string
      vahid: string
      minHedd: Prisma.Decimal | null
      maxHedd: Prisma.Decimal | null
      tesvir: string | null
      yaradilma: Date
    }, ExtArgs["result"]["sensor_tipi"]>
    composites: {}
  }

  type sensor_tipiGetPayload<S extends boolean | null | undefined | sensor_tipiDefaultArgs> = $Result.GetResult<Prisma.$sensor_tipiPayload, S>

  type sensor_tipiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sensor_tipiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sensor_tipiCountAggregateInputType | true
    }

  export interface sensor_tipiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sensor_tipi'], meta: { name: 'sensor_tipi' } }
    /**
     * Find zero or one Sensor_tipi that matches the filter.
     * @param {sensor_tipiFindUniqueArgs} args - Arguments to find a Sensor_tipi
     * @example
     * // Get one Sensor_tipi
     * const sensor_tipi = await prisma.sensor_tipi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sensor_tipiFindUniqueArgs>(args: SelectSubset<T, sensor_tipiFindUniqueArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sensor_tipi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sensor_tipiFindUniqueOrThrowArgs} args - Arguments to find a Sensor_tipi
     * @example
     * // Get one Sensor_tipi
     * const sensor_tipi = await prisma.sensor_tipi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sensor_tipiFindUniqueOrThrowArgs>(args: SelectSubset<T, sensor_tipiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sensor_tipi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_tipiFindFirstArgs} args - Arguments to find a Sensor_tipi
     * @example
     * // Get one Sensor_tipi
     * const sensor_tipi = await prisma.sensor_tipi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sensor_tipiFindFirstArgs>(args?: SelectSubset<T, sensor_tipiFindFirstArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sensor_tipi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_tipiFindFirstOrThrowArgs} args - Arguments to find a Sensor_tipi
     * @example
     * // Get one Sensor_tipi
     * const sensor_tipi = await prisma.sensor_tipi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sensor_tipiFindFirstOrThrowArgs>(args?: SelectSubset<T, sensor_tipiFindFirstOrThrowArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sensor_tipis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_tipiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sensor_tipis
     * const sensor_tipis = await prisma.sensor_tipi.findMany()
     * 
     * // Get first 10 Sensor_tipis
     * const sensor_tipis = await prisma.sensor_tipi.findMany({ take: 10 })
     * 
     * // Only select the `kod`
     * const sensor_tipiWithKodOnly = await prisma.sensor_tipi.findMany({ select: { kod: true } })
     * 
     */
    findMany<T extends sensor_tipiFindManyArgs>(args?: SelectSubset<T, sensor_tipiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sensor_tipi.
     * @param {sensor_tipiCreateArgs} args - Arguments to create a Sensor_tipi.
     * @example
     * // Create one Sensor_tipi
     * const Sensor_tipi = await prisma.sensor_tipi.create({
     *   data: {
     *     // ... data to create a Sensor_tipi
     *   }
     * })
     * 
     */
    create<T extends sensor_tipiCreateArgs>(args: SelectSubset<T, sensor_tipiCreateArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sensor_tipis.
     * @param {sensor_tipiCreateManyArgs} args - Arguments to create many Sensor_tipis.
     * @example
     * // Create many Sensor_tipis
     * const sensor_tipi = await prisma.sensor_tipi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sensor_tipiCreateManyArgs>(args?: SelectSubset<T, sensor_tipiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sensor_tipis and returns the data saved in the database.
     * @param {sensor_tipiCreateManyAndReturnArgs} args - Arguments to create many Sensor_tipis.
     * @example
     * // Create many Sensor_tipis
     * const sensor_tipi = await prisma.sensor_tipi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sensor_tipis and only return the `kod`
     * const sensor_tipiWithKodOnly = await prisma.sensor_tipi.createManyAndReturn({
     *   select: { kod: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sensor_tipiCreateManyAndReturnArgs>(args?: SelectSubset<T, sensor_tipiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sensor_tipi.
     * @param {sensor_tipiDeleteArgs} args - Arguments to delete one Sensor_tipi.
     * @example
     * // Delete one Sensor_tipi
     * const Sensor_tipi = await prisma.sensor_tipi.delete({
     *   where: {
     *     // ... filter to delete one Sensor_tipi
     *   }
     * })
     * 
     */
    delete<T extends sensor_tipiDeleteArgs>(args: SelectSubset<T, sensor_tipiDeleteArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sensor_tipi.
     * @param {sensor_tipiUpdateArgs} args - Arguments to update one Sensor_tipi.
     * @example
     * // Update one Sensor_tipi
     * const sensor_tipi = await prisma.sensor_tipi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sensor_tipiUpdateArgs>(args: SelectSubset<T, sensor_tipiUpdateArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sensor_tipis.
     * @param {sensor_tipiDeleteManyArgs} args - Arguments to filter Sensor_tipis to delete.
     * @example
     * // Delete a few Sensor_tipis
     * const { count } = await prisma.sensor_tipi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sensor_tipiDeleteManyArgs>(args?: SelectSubset<T, sensor_tipiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sensor_tipis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_tipiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sensor_tipis
     * const sensor_tipi = await prisma.sensor_tipi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sensor_tipiUpdateManyArgs>(args: SelectSubset<T, sensor_tipiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sensor_tipis and returns the data updated in the database.
     * @param {sensor_tipiUpdateManyAndReturnArgs} args - Arguments to update many Sensor_tipis.
     * @example
     * // Update many Sensor_tipis
     * const sensor_tipi = await prisma.sensor_tipi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sensor_tipis and only return the `kod`
     * const sensor_tipiWithKodOnly = await prisma.sensor_tipi.updateManyAndReturn({
     *   select: { kod: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sensor_tipiUpdateManyAndReturnArgs>(args: SelectSubset<T, sensor_tipiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sensor_tipi.
     * @param {sensor_tipiUpsertArgs} args - Arguments to update or create a Sensor_tipi.
     * @example
     * // Update or create a Sensor_tipi
     * const sensor_tipi = await prisma.sensor_tipi.upsert({
     *   create: {
     *     // ... data to create a Sensor_tipi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sensor_tipi we want to update
     *   }
     * })
     */
    upsert<T extends sensor_tipiUpsertArgs>(args: SelectSubset<T, sensor_tipiUpsertArgs<ExtArgs>>): Prisma__sensor_tipiClient<$Result.GetResult<Prisma.$sensor_tipiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sensor_tipis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_tipiCountArgs} args - Arguments to filter Sensor_tipis to count.
     * @example
     * // Count the number of Sensor_tipis
     * const count = await prisma.sensor_tipi.count({
     *   where: {
     *     // ... the filter for the Sensor_tipis we want to count
     *   }
     * })
    **/
    count<T extends sensor_tipiCountArgs>(
      args?: Subset<T, sensor_tipiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sensor_tipiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sensor_tipi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sensor_tipiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sensor_tipiAggregateArgs>(args: Subset<T, Sensor_tipiAggregateArgs>): Prisma.PrismaPromise<GetSensor_tipiAggregateType<T>>

    /**
     * Group by Sensor_tipi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_tipiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sensor_tipiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sensor_tipiGroupByArgs['orderBy'] }
        : { orderBy?: sensor_tipiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sensor_tipiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensor_tipiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sensor_tipi model
   */
  readonly fields: sensor_tipiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sensor_tipi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sensor_tipiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cihaz<T extends sensor_tipi$cihazArgs<ExtArgs> = {}>(args?: Subset<T, sensor_tipi$cihazArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sensor_tipi model
   */
  interface sensor_tipiFieldRefs {
    readonly kod: FieldRef<"sensor_tipi", 'String'>
    readonly ad: FieldRef<"sensor_tipi", 'String'>
    readonly vahid: FieldRef<"sensor_tipi", 'String'>
    readonly minHedd: FieldRef<"sensor_tipi", 'Decimal'>
    readonly maxHedd: FieldRef<"sensor_tipi", 'Decimal'>
    readonly tesvir: FieldRef<"sensor_tipi", 'String'>
    readonly yaradilma: FieldRef<"sensor_tipi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sensor_tipi findUnique
   */
  export type sensor_tipiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * Filter, which sensor_tipi to fetch.
     */
    where: sensor_tipiWhereUniqueInput
  }

  /**
   * sensor_tipi findUniqueOrThrow
   */
  export type sensor_tipiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * Filter, which sensor_tipi to fetch.
     */
    where: sensor_tipiWhereUniqueInput
  }

  /**
   * sensor_tipi findFirst
   */
  export type sensor_tipiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * Filter, which sensor_tipi to fetch.
     */
    where?: sensor_tipiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_tipis to fetch.
     */
    orderBy?: sensor_tipiOrderByWithRelationInput | sensor_tipiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sensor_tipis.
     */
    cursor?: sensor_tipiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_tipis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_tipis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sensor_tipis.
     */
    distinct?: Sensor_tipiScalarFieldEnum | Sensor_tipiScalarFieldEnum[]
  }

  /**
   * sensor_tipi findFirstOrThrow
   */
  export type sensor_tipiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * Filter, which sensor_tipi to fetch.
     */
    where?: sensor_tipiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_tipis to fetch.
     */
    orderBy?: sensor_tipiOrderByWithRelationInput | sensor_tipiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sensor_tipis.
     */
    cursor?: sensor_tipiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_tipis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_tipis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sensor_tipis.
     */
    distinct?: Sensor_tipiScalarFieldEnum | Sensor_tipiScalarFieldEnum[]
  }

  /**
   * sensor_tipi findMany
   */
  export type sensor_tipiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * Filter, which sensor_tipis to fetch.
     */
    where?: sensor_tipiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_tipis to fetch.
     */
    orderBy?: sensor_tipiOrderByWithRelationInput | sensor_tipiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sensor_tipis.
     */
    cursor?: sensor_tipiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_tipis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_tipis.
     */
    skip?: number
    distinct?: Sensor_tipiScalarFieldEnum | Sensor_tipiScalarFieldEnum[]
  }

  /**
   * sensor_tipi create
   */
  export type sensor_tipiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * The data needed to create a sensor_tipi.
     */
    data: XOR<sensor_tipiCreateInput, sensor_tipiUncheckedCreateInput>
  }

  /**
   * sensor_tipi createMany
   */
  export type sensor_tipiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sensor_tipis.
     */
    data: sensor_tipiCreateManyInput | sensor_tipiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sensor_tipi createManyAndReturn
   */
  export type sensor_tipiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * The data used to create many sensor_tipis.
     */
    data: sensor_tipiCreateManyInput | sensor_tipiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sensor_tipi update
   */
  export type sensor_tipiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * The data needed to update a sensor_tipi.
     */
    data: XOR<sensor_tipiUpdateInput, sensor_tipiUncheckedUpdateInput>
    /**
     * Choose, which sensor_tipi to update.
     */
    where: sensor_tipiWhereUniqueInput
  }

  /**
   * sensor_tipi updateMany
   */
  export type sensor_tipiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sensor_tipis.
     */
    data: XOR<sensor_tipiUpdateManyMutationInput, sensor_tipiUncheckedUpdateManyInput>
    /**
     * Filter which sensor_tipis to update
     */
    where?: sensor_tipiWhereInput
    /**
     * Limit how many sensor_tipis to update.
     */
    limit?: number
  }

  /**
   * sensor_tipi updateManyAndReturn
   */
  export type sensor_tipiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * The data used to update sensor_tipis.
     */
    data: XOR<sensor_tipiUpdateManyMutationInput, sensor_tipiUncheckedUpdateManyInput>
    /**
     * Filter which sensor_tipis to update
     */
    where?: sensor_tipiWhereInput
    /**
     * Limit how many sensor_tipis to update.
     */
    limit?: number
  }

  /**
   * sensor_tipi upsert
   */
  export type sensor_tipiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * The filter to search for the sensor_tipi to update in case it exists.
     */
    where: sensor_tipiWhereUniqueInput
    /**
     * In case the sensor_tipi found by the `where` argument doesn't exist, create a new sensor_tipi with this data.
     */
    create: XOR<sensor_tipiCreateInput, sensor_tipiUncheckedCreateInput>
    /**
     * In case the sensor_tipi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sensor_tipiUpdateInput, sensor_tipiUncheckedUpdateInput>
  }

  /**
   * sensor_tipi delete
   */
  export type sensor_tipiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
    /**
     * Filter which sensor_tipi to delete.
     */
    where: sensor_tipiWhereUniqueInput
  }

  /**
   * sensor_tipi deleteMany
   */
  export type sensor_tipiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sensor_tipis to delete
     */
    where?: sensor_tipiWhereInput
    /**
     * Limit how many sensor_tipis to delete.
     */
    limit?: number
  }

  /**
   * sensor_tipi.cihaz
   */
  export type sensor_tipi$cihazArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cihaz
     */
    select?: cihazSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cihaz
     */
    omit?: cihazOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cihazInclude<ExtArgs> | null
    where?: cihazWhereInput
    orderBy?: cihazOrderByWithRelationInput | cihazOrderByWithRelationInput[]
    cursor?: cihazWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CihazScalarFieldEnum | CihazScalarFieldEnum[]
  }

  /**
   * sensor_tipi without action
   */
  export type sensor_tipiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_tipi
     */
    select?: sensor_tipiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sensor_tipi
     */
    omit?: sensor_tipiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_tipiInclude<ExtArgs> | null
  }


  /**
   * Model xeberdarliq
   */

  export type AggregateXeberdarliq = {
    _count: XeberdarliqCountAggregateOutputType | null
    _avg: XeberdarliqAvgAggregateOutputType | null
    _sum: XeberdarliqSumAggregateOutputType | null
    _min: XeberdarliqMinAggregateOutputType | null
    _max: XeberdarliqMaxAggregateOutputType | null
  }

  export type XeberdarliqAvgAggregateOutputType = {
    id: number | null
    qiymet: Decimal | null
  }

  export type XeberdarliqSumAggregateOutputType = {
    id: bigint | null
    qiymet: Decimal | null
  }

  export type XeberdarliqMinAggregateOutputType = {
    id: bigint | null
    cihazKod: string | null
    olcmeVaxti: Date | null
    qiymet: Decimal | null
    novu: string | null
    mesaj: string | null
    hellOlundu: boolean | null
    yaradilma: Date | null
  }

  export type XeberdarliqMaxAggregateOutputType = {
    id: bigint | null
    cihazKod: string | null
    olcmeVaxti: Date | null
    qiymet: Decimal | null
    novu: string | null
    mesaj: string | null
    hellOlundu: boolean | null
    yaradilma: Date | null
  }

  export type XeberdarliqCountAggregateOutputType = {
    id: number
    cihazKod: number
    olcmeVaxti: number
    qiymet: number
    novu: number
    mesaj: number
    hellOlundu: number
    yaradilma: number
    _all: number
  }


  export type XeberdarliqAvgAggregateInputType = {
    id?: true
    qiymet?: true
  }

  export type XeberdarliqSumAggregateInputType = {
    id?: true
    qiymet?: true
  }

  export type XeberdarliqMinAggregateInputType = {
    id?: true
    cihazKod?: true
    olcmeVaxti?: true
    qiymet?: true
    novu?: true
    mesaj?: true
    hellOlundu?: true
    yaradilma?: true
  }

  export type XeberdarliqMaxAggregateInputType = {
    id?: true
    cihazKod?: true
    olcmeVaxti?: true
    qiymet?: true
    novu?: true
    mesaj?: true
    hellOlundu?: true
    yaradilma?: true
  }

  export type XeberdarliqCountAggregateInputType = {
    id?: true
    cihazKod?: true
    olcmeVaxti?: true
    qiymet?: true
    novu?: true
    mesaj?: true
    hellOlundu?: true
    yaradilma?: true
    _all?: true
  }

  export type XeberdarliqAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which xeberdarliq to aggregate.
     */
    where?: xeberdarliqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xeberdarliqs to fetch.
     */
    orderBy?: xeberdarliqOrderByWithRelationInput | xeberdarliqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: xeberdarliqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xeberdarliqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xeberdarliqs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned xeberdarliqs
    **/
    _count?: true | XeberdarliqCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: XeberdarliqAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: XeberdarliqSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: XeberdarliqMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: XeberdarliqMaxAggregateInputType
  }

  export type GetXeberdarliqAggregateType<T extends XeberdarliqAggregateArgs> = {
        [P in keyof T & keyof AggregateXeberdarliq]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateXeberdarliq[P]>
      : GetScalarType<T[P], AggregateXeberdarliq[P]>
  }




  export type xeberdarliqGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: xeberdarliqWhereInput
    orderBy?: xeberdarliqOrderByWithAggregationInput | xeberdarliqOrderByWithAggregationInput[]
    by: XeberdarliqScalarFieldEnum[] | XeberdarliqScalarFieldEnum
    having?: xeberdarliqScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: XeberdarliqCountAggregateInputType | true
    _avg?: XeberdarliqAvgAggregateInputType
    _sum?: XeberdarliqSumAggregateInputType
    _min?: XeberdarliqMinAggregateInputType
    _max?: XeberdarliqMaxAggregateInputType
  }

  export type XeberdarliqGroupByOutputType = {
    id: bigint
    cihazKod: string
    olcmeVaxti: Date
    qiymet: Decimal
    novu: string
    mesaj: string | null
    hellOlundu: boolean
    yaradilma: Date
    _count: XeberdarliqCountAggregateOutputType | null
    _avg: XeberdarliqAvgAggregateOutputType | null
    _sum: XeberdarliqSumAggregateOutputType | null
    _min: XeberdarliqMinAggregateOutputType | null
    _max: XeberdarliqMaxAggregateOutputType | null
  }

  type GetXeberdarliqGroupByPayload<T extends xeberdarliqGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<XeberdarliqGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof XeberdarliqGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], XeberdarliqGroupByOutputType[P]>
            : GetScalarType<T[P], XeberdarliqGroupByOutputType[P]>
        }
      >
    >


  export type xeberdarliqSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    novu?: boolean
    mesaj?: boolean
    hellOlundu?: boolean
    yaradilma?: boolean
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xeberdarliq"]>

  export type xeberdarliqSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    novu?: boolean
    mesaj?: boolean
    hellOlundu?: boolean
    yaradilma?: boolean
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xeberdarliq"]>

  export type xeberdarliqSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    novu?: boolean
    mesaj?: boolean
    hellOlundu?: boolean
    yaradilma?: boolean
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xeberdarliq"]>

  export type xeberdarliqSelectScalar = {
    id?: boolean
    cihazKod?: boolean
    olcmeVaxti?: boolean
    qiymet?: boolean
    novu?: boolean
    mesaj?: boolean
    hellOlundu?: boolean
    yaradilma?: boolean
  }

  export type xeberdarliqOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cihazKod" | "olcmeVaxti" | "qiymet" | "novu" | "mesaj" | "hellOlundu" | "yaradilma", ExtArgs["result"]["xeberdarliq"]>
  export type xeberdarliqInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }
  export type xeberdarliqIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }
  export type xeberdarliqIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cihaz?: boolean | cihazDefaultArgs<ExtArgs>
  }

  export type $xeberdarliqPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "xeberdarliq"
    objects: {
      cihaz: Prisma.$cihazPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      cihazKod: string
      olcmeVaxti: Date
      qiymet: Prisma.Decimal
      novu: string
      mesaj: string | null
      hellOlundu: boolean
      yaradilma: Date
    }, ExtArgs["result"]["xeberdarliq"]>
    composites: {}
  }

  type xeberdarliqGetPayload<S extends boolean | null | undefined | xeberdarliqDefaultArgs> = $Result.GetResult<Prisma.$xeberdarliqPayload, S>

  type xeberdarliqCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<xeberdarliqFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: XeberdarliqCountAggregateInputType | true
    }

  export interface xeberdarliqDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['xeberdarliq'], meta: { name: 'xeberdarliq' } }
    /**
     * Find zero or one Xeberdarliq that matches the filter.
     * @param {xeberdarliqFindUniqueArgs} args - Arguments to find a Xeberdarliq
     * @example
     * // Get one Xeberdarliq
     * const xeberdarliq = await prisma.xeberdarliq.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends xeberdarliqFindUniqueArgs>(args: SelectSubset<T, xeberdarliqFindUniqueArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Xeberdarliq that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {xeberdarliqFindUniqueOrThrowArgs} args - Arguments to find a Xeberdarliq
     * @example
     * // Get one Xeberdarliq
     * const xeberdarliq = await prisma.xeberdarliq.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends xeberdarliqFindUniqueOrThrowArgs>(args: SelectSubset<T, xeberdarliqFindUniqueOrThrowArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Xeberdarliq that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xeberdarliqFindFirstArgs} args - Arguments to find a Xeberdarliq
     * @example
     * // Get one Xeberdarliq
     * const xeberdarliq = await prisma.xeberdarliq.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends xeberdarliqFindFirstArgs>(args?: SelectSubset<T, xeberdarliqFindFirstArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Xeberdarliq that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xeberdarliqFindFirstOrThrowArgs} args - Arguments to find a Xeberdarliq
     * @example
     * // Get one Xeberdarliq
     * const xeberdarliq = await prisma.xeberdarliq.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends xeberdarliqFindFirstOrThrowArgs>(args?: SelectSubset<T, xeberdarliqFindFirstOrThrowArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Xeberdarliqs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xeberdarliqFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Xeberdarliqs
     * const xeberdarliqs = await prisma.xeberdarliq.findMany()
     * 
     * // Get first 10 Xeberdarliqs
     * const xeberdarliqs = await prisma.xeberdarliq.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const xeberdarliqWithIdOnly = await prisma.xeberdarliq.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends xeberdarliqFindManyArgs>(args?: SelectSubset<T, xeberdarliqFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Xeberdarliq.
     * @param {xeberdarliqCreateArgs} args - Arguments to create a Xeberdarliq.
     * @example
     * // Create one Xeberdarliq
     * const Xeberdarliq = await prisma.xeberdarliq.create({
     *   data: {
     *     // ... data to create a Xeberdarliq
     *   }
     * })
     * 
     */
    create<T extends xeberdarliqCreateArgs>(args: SelectSubset<T, xeberdarliqCreateArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Xeberdarliqs.
     * @param {xeberdarliqCreateManyArgs} args - Arguments to create many Xeberdarliqs.
     * @example
     * // Create many Xeberdarliqs
     * const xeberdarliq = await prisma.xeberdarliq.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends xeberdarliqCreateManyArgs>(args?: SelectSubset<T, xeberdarliqCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Xeberdarliqs and returns the data saved in the database.
     * @param {xeberdarliqCreateManyAndReturnArgs} args - Arguments to create many Xeberdarliqs.
     * @example
     * // Create many Xeberdarliqs
     * const xeberdarliq = await prisma.xeberdarliq.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Xeberdarliqs and only return the `id`
     * const xeberdarliqWithIdOnly = await prisma.xeberdarliq.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends xeberdarliqCreateManyAndReturnArgs>(args?: SelectSubset<T, xeberdarliqCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Xeberdarliq.
     * @param {xeberdarliqDeleteArgs} args - Arguments to delete one Xeberdarliq.
     * @example
     * // Delete one Xeberdarliq
     * const Xeberdarliq = await prisma.xeberdarliq.delete({
     *   where: {
     *     // ... filter to delete one Xeberdarliq
     *   }
     * })
     * 
     */
    delete<T extends xeberdarliqDeleteArgs>(args: SelectSubset<T, xeberdarliqDeleteArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Xeberdarliq.
     * @param {xeberdarliqUpdateArgs} args - Arguments to update one Xeberdarliq.
     * @example
     * // Update one Xeberdarliq
     * const xeberdarliq = await prisma.xeberdarliq.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends xeberdarliqUpdateArgs>(args: SelectSubset<T, xeberdarliqUpdateArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Xeberdarliqs.
     * @param {xeberdarliqDeleteManyArgs} args - Arguments to filter Xeberdarliqs to delete.
     * @example
     * // Delete a few Xeberdarliqs
     * const { count } = await prisma.xeberdarliq.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends xeberdarliqDeleteManyArgs>(args?: SelectSubset<T, xeberdarliqDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Xeberdarliqs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xeberdarliqUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Xeberdarliqs
     * const xeberdarliq = await prisma.xeberdarliq.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends xeberdarliqUpdateManyArgs>(args: SelectSubset<T, xeberdarliqUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Xeberdarliqs and returns the data updated in the database.
     * @param {xeberdarliqUpdateManyAndReturnArgs} args - Arguments to update many Xeberdarliqs.
     * @example
     * // Update many Xeberdarliqs
     * const xeberdarliq = await prisma.xeberdarliq.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Xeberdarliqs and only return the `id`
     * const xeberdarliqWithIdOnly = await prisma.xeberdarliq.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends xeberdarliqUpdateManyAndReturnArgs>(args: SelectSubset<T, xeberdarliqUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Xeberdarliq.
     * @param {xeberdarliqUpsertArgs} args - Arguments to update or create a Xeberdarliq.
     * @example
     * // Update or create a Xeberdarliq
     * const xeberdarliq = await prisma.xeberdarliq.upsert({
     *   create: {
     *     // ... data to create a Xeberdarliq
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Xeberdarliq we want to update
     *   }
     * })
     */
    upsert<T extends xeberdarliqUpsertArgs>(args: SelectSubset<T, xeberdarliqUpsertArgs<ExtArgs>>): Prisma__xeberdarliqClient<$Result.GetResult<Prisma.$xeberdarliqPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Xeberdarliqs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xeberdarliqCountArgs} args - Arguments to filter Xeberdarliqs to count.
     * @example
     * // Count the number of Xeberdarliqs
     * const count = await prisma.xeberdarliq.count({
     *   where: {
     *     // ... the filter for the Xeberdarliqs we want to count
     *   }
     * })
    **/
    count<T extends xeberdarliqCountArgs>(
      args?: Subset<T, xeberdarliqCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], XeberdarliqCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Xeberdarliq.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XeberdarliqAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends XeberdarliqAggregateArgs>(args: Subset<T, XeberdarliqAggregateArgs>): Prisma.PrismaPromise<GetXeberdarliqAggregateType<T>>

    /**
     * Group by Xeberdarliq.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xeberdarliqGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends xeberdarliqGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: xeberdarliqGroupByArgs['orderBy'] }
        : { orderBy?: xeberdarliqGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, xeberdarliqGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetXeberdarliqGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the xeberdarliq model
   */
  readonly fields: xeberdarliqFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for xeberdarliq.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__xeberdarliqClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cihaz<T extends cihazDefaultArgs<ExtArgs> = {}>(args?: Subset<T, cihazDefaultArgs<ExtArgs>>): Prisma__cihazClient<$Result.GetResult<Prisma.$cihazPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the xeberdarliq model
   */
  interface xeberdarliqFieldRefs {
    readonly id: FieldRef<"xeberdarliq", 'BigInt'>
    readonly cihazKod: FieldRef<"xeberdarliq", 'String'>
    readonly olcmeVaxti: FieldRef<"xeberdarliq", 'DateTime'>
    readonly qiymet: FieldRef<"xeberdarliq", 'Decimal'>
    readonly novu: FieldRef<"xeberdarliq", 'String'>
    readonly mesaj: FieldRef<"xeberdarliq", 'String'>
    readonly hellOlundu: FieldRef<"xeberdarliq", 'Boolean'>
    readonly yaradilma: FieldRef<"xeberdarliq", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * xeberdarliq findUnique
   */
  export type xeberdarliqFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * Filter, which xeberdarliq to fetch.
     */
    where: xeberdarliqWhereUniqueInput
  }

  /**
   * xeberdarliq findUniqueOrThrow
   */
  export type xeberdarliqFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * Filter, which xeberdarliq to fetch.
     */
    where: xeberdarliqWhereUniqueInput
  }

  /**
   * xeberdarliq findFirst
   */
  export type xeberdarliqFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * Filter, which xeberdarliq to fetch.
     */
    where?: xeberdarliqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xeberdarliqs to fetch.
     */
    orderBy?: xeberdarliqOrderByWithRelationInput | xeberdarliqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for xeberdarliqs.
     */
    cursor?: xeberdarliqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xeberdarliqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xeberdarliqs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of xeberdarliqs.
     */
    distinct?: XeberdarliqScalarFieldEnum | XeberdarliqScalarFieldEnum[]
  }

  /**
   * xeberdarliq findFirstOrThrow
   */
  export type xeberdarliqFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * Filter, which xeberdarliq to fetch.
     */
    where?: xeberdarliqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xeberdarliqs to fetch.
     */
    orderBy?: xeberdarliqOrderByWithRelationInput | xeberdarliqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for xeberdarliqs.
     */
    cursor?: xeberdarliqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xeberdarliqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xeberdarliqs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of xeberdarliqs.
     */
    distinct?: XeberdarliqScalarFieldEnum | XeberdarliqScalarFieldEnum[]
  }

  /**
   * xeberdarliq findMany
   */
  export type xeberdarliqFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * Filter, which xeberdarliqs to fetch.
     */
    where?: xeberdarliqWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xeberdarliqs to fetch.
     */
    orderBy?: xeberdarliqOrderByWithRelationInput | xeberdarliqOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing xeberdarliqs.
     */
    cursor?: xeberdarliqWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xeberdarliqs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xeberdarliqs.
     */
    skip?: number
    distinct?: XeberdarliqScalarFieldEnum | XeberdarliqScalarFieldEnum[]
  }

  /**
   * xeberdarliq create
   */
  export type xeberdarliqCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * The data needed to create a xeberdarliq.
     */
    data: XOR<xeberdarliqCreateInput, xeberdarliqUncheckedCreateInput>
  }

  /**
   * xeberdarliq createMany
   */
  export type xeberdarliqCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many xeberdarliqs.
     */
    data: xeberdarliqCreateManyInput | xeberdarliqCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * xeberdarliq createManyAndReturn
   */
  export type xeberdarliqCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * The data used to create many xeberdarliqs.
     */
    data: xeberdarliqCreateManyInput | xeberdarliqCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * xeberdarliq update
   */
  export type xeberdarliqUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * The data needed to update a xeberdarliq.
     */
    data: XOR<xeberdarliqUpdateInput, xeberdarliqUncheckedUpdateInput>
    /**
     * Choose, which xeberdarliq to update.
     */
    where: xeberdarliqWhereUniqueInput
  }

  /**
   * xeberdarliq updateMany
   */
  export type xeberdarliqUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update xeberdarliqs.
     */
    data: XOR<xeberdarliqUpdateManyMutationInput, xeberdarliqUncheckedUpdateManyInput>
    /**
     * Filter which xeberdarliqs to update
     */
    where?: xeberdarliqWhereInput
    /**
     * Limit how many xeberdarliqs to update.
     */
    limit?: number
  }

  /**
   * xeberdarliq updateManyAndReturn
   */
  export type xeberdarliqUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * The data used to update xeberdarliqs.
     */
    data: XOR<xeberdarliqUpdateManyMutationInput, xeberdarliqUncheckedUpdateManyInput>
    /**
     * Filter which xeberdarliqs to update
     */
    where?: xeberdarliqWhereInput
    /**
     * Limit how many xeberdarliqs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * xeberdarliq upsert
   */
  export type xeberdarliqUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * The filter to search for the xeberdarliq to update in case it exists.
     */
    where: xeberdarliqWhereUniqueInput
    /**
     * In case the xeberdarliq found by the `where` argument doesn't exist, create a new xeberdarliq with this data.
     */
    create: XOR<xeberdarliqCreateInput, xeberdarliqUncheckedCreateInput>
    /**
     * In case the xeberdarliq was found with the provided `where` argument, update it with this data.
     */
    update: XOR<xeberdarliqUpdateInput, xeberdarliqUncheckedUpdateInput>
  }

  /**
   * xeberdarliq delete
   */
  export type xeberdarliqDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
    /**
     * Filter which xeberdarliq to delete.
     */
    where: xeberdarliqWhereUniqueInput
  }

  /**
   * xeberdarliq deleteMany
   */
  export type xeberdarliqDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which xeberdarliqs to delete
     */
    where?: xeberdarliqWhereInput
    /**
     * Limit how many xeberdarliqs to delete.
     */
    limit?: number
  }

  /**
   * xeberdarliq without action
   */
  export type xeberdarliqDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xeberdarliq
     */
    select?: xeberdarliqSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xeberdarliq
     */
    omit?: xeberdarliqOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xeberdarliqInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CihazScalarFieldEnum: {
    kod: 'kod',
    sensorTipiKod: 'sensorTipiKod',
    ad: 'ad',
    yer: 'yer',
    status: 'status',
    qurasdirilma: 'qurasdirilma',
    yaradilma: 'yaradilma'
  };

  export type CihazScalarFieldEnum = (typeof CihazScalarFieldEnum)[keyof typeof CihazScalarFieldEnum]


  export const OlcmeScalarFieldEnum: {
    id: 'id',
    cihazKod: 'cihazKod',
    olcmeVaxti: 'olcmeVaxti',
    qiymet: 'qiymet',
    keyfiyyet: 'keyfiyyet',
    syncStatus: 'syncStatus',
    yaradilma: 'yaradilma'
  };

  export type OlcmeScalarFieldEnum = (typeof OlcmeScalarFieldEnum)[keyof typeof OlcmeScalarFieldEnum]


  export const Sensor_tipiScalarFieldEnum: {
    kod: 'kod',
    ad: 'ad',
    vahid: 'vahid',
    minHedd: 'minHedd',
    maxHedd: 'maxHedd',
    tesvir: 'tesvir',
    yaradilma: 'yaradilma'
  };

  export type Sensor_tipiScalarFieldEnum = (typeof Sensor_tipiScalarFieldEnum)[keyof typeof Sensor_tipiScalarFieldEnum]


  export const XeberdarliqScalarFieldEnum: {
    id: 'id',
    cihazKod: 'cihazKod',
    olcmeVaxti: 'olcmeVaxti',
    qiymet: 'qiymet',
    novu: 'novu',
    mesaj: 'mesaj',
    hellOlundu: 'hellOlundu',
    yaradilma: 'yaradilma'
  };

  export type XeberdarliqScalarFieldEnum = (typeof XeberdarliqScalarFieldEnum)[keyof typeof XeberdarliqScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type cihazWhereInput = {
    AND?: cihazWhereInput | cihazWhereInput[]
    OR?: cihazWhereInput[]
    NOT?: cihazWhereInput | cihazWhereInput[]
    kod?: StringFilter<"cihaz"> | string
    sensorTipiKod?: StringFilter<"cihaz"> | string
    ad?: StringFilter<"cihaz"> | string
    yer?: StringNullableFilter<"cihaz"> | string | null
    status?: StringFilter<"cihaz"> | string
    qurasdirilma?: DateTimeNullableFilter<"cihaz"> | Date | string | null
    yaradilma?: DateTimeFilter<"cihaz"> | Date | string
    sensorTipi?: XOR<Sensor_tipiScalarRelationFilter, sensor_tipiWhereInput>
    olcme?: OlcmeListRelationFilter
    xeberdarliq?: XeberdarliqListRelationFilter
  }

  export type cihazOrderByWithRelationInput = {
    kod?: SortOrder
    sensorTipiKod?: SortOrder
    ad?: SortOrder
    yer?: SortOrderInput | SortOrder
    status?: SortOrder
    qurasdirilma?: SortOrderInput | SortOrder
    yaradilma?: SortOrder
    sensorTipi?: sensor_tipiOrderByWithRelationInput
    olcme?: olcmeOrderByRelationAggregateInput
    xeberdarliq?: xeberdarliqOrderByRelationAggregateInput
  }

  export type cihazWhereUniqueInput = Prisma.AtLeast<{
    kod?: string
    AND?: cihazWhereInput | cihazWhereInput[]
    OR?: cihazWhereInput[]
    NOT?: cihazWhereInput | cihazWhereInput[]
    sensorTipiKod?: StringFilter<"cihaz"> | string
    ad?: StringFilter<"cihaz"> | string
    yer?: StringNullableFilter<"cihaz"> | string | null
    status?: StringFilter<"cihaz"> | string
    qurasdirilma?: DateTimeNullableFilter<"cihaz"> | Date | string | null
    yaradilma?: DateTimeFilter<"cihaz"> | Date | string
    sensorTipi?: XOR<Sensor_tipiScalarRelationFilter, sensor_tipiWhereInput>
    olcme?: OlcmeListRelationFilter
    xeberdarliq?: XeberdarliqListRelationFilter
  }, "kod">

  export type cihazOrderByWithAggregationInput = {
    kod?: SortOrder
    sensorTipiKod?: SortOrder
    ad?: SortOrder
    yer?: SortOrderInput | SortOrder
    status?: SortOrder
    qurasdirilma?: SortOrderInput | SortOrder
    yaradilma?: SortOrder
    _count?: cihazCountOrderByAggregateInput
    _max?: cihazMaxOrderByAggregateInput
    _min?: cihazMinOrderByAggregateInput
  }

  export type cihazScalarWhereWithAggregatesInput = {
    AND?: cihazScalarWhereWithAggregatesInput | cihazScalarWhereWithAggregatesInput[]
    OR?: cihazScalarWhereWithAggregatesInput[]
    NOT?: cihazScalarWhereWithAggregatesInput | cihazScalarWhereWithAggregatesInput[]
    kod?: StringWithAggregatesFilter<"cihaz"> | string
    sensorTipiKod?: StringWithAggregatesFilter<"cihaz"> | string
    ad?: StringWithAggregatesFilter<"cihaz"> | string
    yer?: StringNullableWithAggregatesFilter<"cihaz"> | string | null
    status?: StringWithAggregatesFilter<"cihaz"> | string
    qurasdirilma?: DateTimeNullableWithAggregatesFilter<"cihaz"> | Date | string | null
    yaradilma?: DateTimeWithAggregatesFilter<"cihaz"> | Date | string
  }

  export type olcmeWhereInput = {
    AND?: olcmeWhereInput | olcmeWhereInput[]
    OR?: olcmeWhereInput[]
    NOT?: olcmeWhereInput | olcmeWhereInput[]
    id?: BigIntFilter<"olcme"> | bigint | number
    cihazKod?: StringFilter<"olcme"> | string
    olcmeVaxti?: DateTimeFilter<"olcme"> | Date | string
    qiymet?: DecimalFilter<"olcme"> | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFilter<"olcme"> | number
    syncStatus?: IntFilter<"olcme"> | number
    yaradilma?: DateTimeFilter<"olcme"> | Date | string
    cihaz?: XOR<CihazScalarRelationFilter, cihazWhereInput>
  }

  export type olcmeOrderByWithRelationInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
    yaradilma?: SortOrder
    cihaz?: cihazOrderByWithRelationInput
  }

  export type olcmeWhereUniqueInput = Prisma.AtLeast<{
    id_olcmeVaxti?: olcmeIdOlcmeVaxtiCompoundUniqueInput
    AND?: olcmeWhereInput | olcmeWhereInput[]
    OR?: olcmeWhereInput[]
    NOT?: olcmeWhereInput | olcmeWhereInput[]
    id?: BigIntFilter<"olcme"> | bigint | number
    cihazKod?: StringFilter<"olcme"> | string
    olcmeVaxti?: DateTimeFilter<"olcme"> | Date | string
    qiymet?: DecimalFilter<"olcme"> | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFilter<"olcme"> | number
    syncStatus?: IntFilter<"olcme"> | number
    yaradilma?: DateTimeFilter<"olcme"> | Date | string
    cihaz?: XOR<CihazScalarRelationFilter, cihazWhereInput>
  }, "id_olcmeVaxti">

  export type olcmeOrderByWithAggregationInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
    yaradilma?: SortOrder
    _count?: olcmeCountOrderByAggregateInput
    _avg?: olcmeAvgOrderByAggregateInput
    _max?: olcmeMaxOrderByAggregateInput
    _min?: olcmeMinOrderByAggregateInput
    _sum?: olcmeSumOrderByAggregateInput
  }

  export type olcmeScalarWhereWithAggregatesInput = {
    AND?: olcmeScalarWhereWithAggregatesInput | olcmeScalarWhereWithAggregatesInput[]
    OR?: olcmeScalarWhereWithAggregatesInput[]
    NOT?: olcmeScalarWhereWithAggregatesInput | olcmeScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"olcme"> | bigint | number
    cihazKod?: StringWithAggregatesFilter<"olcme"> | string
    olcmeVaxti?: DateTimeWithAggregatesFilter<"olcme"> | Date | string
    qiymet?: DecimalWithAggregatesFilter<"olcme"> | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntWithAggregatesFilter<"olcme"> | number
    syncStatus?: IntWithAggregatesFilter<"olcme"> | number
    yaradilma?: DateTimeWithAggregatesFilter<"olcme"> | Date | string
  }

  export type sensor_tipiWhereInput = {
    AND?: sensor_tipiWhereInput | sensor_tipiWhereInput[]
    OR?: sensor_tipiWhereInput[]
    NOT?: sensor_tipiWhereInput | sensor_tipiWhereInput[]
    kod?: StringFilter<"sensor_tipi"> | string
    ad?: StringFilter<"sensor_tipi"> | string
    vahid?: StringFilter<"sensor_tipi"> | string
    minHedd?: DecimalNullableFilter<"sensor_tipi"> | Decimal | DecimalJsLike | number | string | null
    maxHedd?: DecimalNullableFilter<"sensor_tipi"> | Decimal | DecimalJsLike | number | string | null
    tesvir?: StringNullableFilter<"sensor_tipi"> | string | null
    yaradilma?: DateTimeFilter<"sensor_tipi"> | Date | string
    cihaz?: CihazListRelationFilter
  }

  export type sensor_tipiOrderByWithRelationInput = {
    kod?: SortOrder
    ad?: SortOrder
    vahid?: SortOrder
    minHedd?: SortOrderInput | SortOrder
    maxHedd?: SortOrderInput | SortOrder
    tesvir?: SortOrderInput | SortOrder
    yaradilma?: SortOrder
    cihaz?: cihazOrderByRelationAggregateInput
  }

  export type sensor_tipiWhereUniqueInput = Prisma.AtLeast<{
    kod?: string
    AND?: sensor_tipiWhereInput | sensor_tipiWhereInput[]
    OR?: sensor_tipiWhereInput[]
    NOT?: sensor_tipiWhereInput | sensor_tipiWhereInput[]
    ad?: StringFilter<"sensor_tipi"> | string
    vahid?: StringFilter<"sensor_tipi"> | string
    minHedd?: DecimalNullableFilter<"sensor_tipi"> | Decimal | DecimalJsLike | number | string | null
    maxHedd?: DecimalNullableFilter<"sensor_tipi"> | Decimal | DecimalJsLike | number | string | null
    tesvir?: StringNullableFilter<"sensor_tipi"> | string | null
    yaradilma?: DateTimeFilter<"sensor_tipi"> | Date | string
    cihaz?: CihazListRelationFilter
  }, "kod">

  export type sensor_tipiOrderByWithAggregationInput = {
    kod?: SortOrder
    ad?: SortOrder
    vahid?: SortOrder
    minHedd?: SortOrderInput | SortOrder
    maxHedd?: SortOrderInput | SortOrder
    tesvir?: SortOrderInput | SortOrder
    yaradilma?: SortOrder
    _count?: sensor_tipiCountOrderByAggregateInput
    _avg?: sensor_tipiAvgOrderByAggregateInput
    _max?: sensor_tipiMaxOrderByAggregateInput
    _min?: sensor_tipiMinOrderByAggregateInput
    _sum?: sensor_tipiSumOrderByAggregateInput
  }

  export type sensor_tipiScalarWhereWithAggregatesInput = {
    AND?: sensor_tipiScalarWhereWithAggregatesInput | sensor_tipiScalarWhereWithAggregatesInput[]
    OR?: sensor_tipiScalarWhereWithAggregatesInput[]
    NOT?: sensor_tipiScalarWhereWithAggregatesInput | sensor_tipiScalarWhereWithAggregatesInput[]
    kod?: StringWithAggregatesFilter<"sensor_tipi"> | string
    ad?: StringWithAggregatesFilter<"sensor_tipi"> | string
    vahid?: StringWithAggregatesFilter<"sensor_tipi"> | string
    minHedd?: DecimalNullableWithAggregatesFilter<"sensor_tipi"> | Decimal | DecimalJsLike | number | string | null
    maxHedd?: DecimalNullableWithAggregatesFilter<"sensor_tipi"> | Decimal | DecimalJsLike | number | string | null
    tesvir?: StringNullableWithAggregatesFilter<"sensor_tipi"> | string | null
    yaradilma?: DateTimeWithAggregatesFilter<"sensor_tipi"> | Date | string
  }

  export type xeberdarliqWhereInput = {
    AND?: xeberdarliqWhereInput | xeberdarliqWhereInput[]
    OR?: xeberdarliqWhereInput[]
    NOT?: xeberdarliqWhereInput | xeberdarliqWhereInput[]
    id?: BigIntFilter<"xeberdarliq"> | bigint | number
    cihazKod?: StringFilter<"xeberdarliq"> | string
    olcmeVaxti?: DateTimeFilter<"xeberdarliq"> | Date | string
    qiymet?: DecimalFilter<"xeberdarliq"> | Decimal | DecimalJsLike | number | string
    novu?: StringFilter<"xeberdarliq"> | string
    mesaj?: StringNullableFilter<"xeberdarliq"> | string | null
    hellOlundu?: BoolFilter<"xeberdarliq"> | boolean
    yaradilma?: DateTimeFilter<"xeberdarliq"> | Date | string
    cihaz?: XOR<CihazScalarRelationFilter, cihazWhereInput>
  }

  export type xeberdarliqOrderByWithRelationInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    novu?: SortOrder
    mesaj?: SortOrderInput | SortOrder
    hellOlundu?: SortOrder
    yaradilma?: SortOrder
    cihaz?: cihazOrderByWithRelationInput
  }

  export type xeberdarliqWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: xeberdarliqWhereInput | xeberdarliqWhereInput[]
    OR?: xeberdarliqWhereInput[]
    NOT?: xeberdarliqWhereInput | xeberdarliqWhereInput[]
    cihazKod?: StringFilter<"xeberdarliq"> | string
    olcmeVaxti?: DateTimeFilter<"xeberdarliq"> | Date | string
    qiymet?: DecimalFilter<"xeberdarliq"> | Decimal | DecimalJsLike | number | string
    novu?: StringFilter<"xeberdarliq"> | string
    mesaj?: StringNullableFilter<"xeberdarliq"> | string | null
    hellOlundu?: BoolFilter<"xeberdarliq"> | boolean
    yaradilma?: DateTimeFilter<"xeberdarliq"> | Date | string
    cihaz?: XOR<CihazScalarRelationFilter, cihazWhereInput>
  }, "id">

  export type xeberdarliqOrderByWithAggregationInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    novu?: SortOrder
    mesaj?: SortOrderInput | SortOrder
    hellOlundu?: SortOrder
    yaradilma?: SortOrder
    _count?: xeberdarliqCountOrderByAggregateInput
    _avg?: xeberdarliqAvgOrderByAggregateInput
    _max?: xeberdarliqMaxOrderByAggregateInput
    _min?: xeberdarliqMinOrderByAggregateInput
    _sum?: xeberdarliqSumOrderByAggregateInput
  }

  export type xeberdarliqScalarWhereWithAggregatesInput = {
    AND?: xeberdarliqScalarWhereWithAggregatesInput | xeberdarliqScalarWhereWithAggregatesInput[]
    OR?: xeberdarliqScalarWhereWithAggregatesInput[]
    NOT?: xeberdarliqScalarWhereWithAggregatesInput | xeberdarliqScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"xeberdarliq"> | bigint | number
    cihazKod?: StringWithAggregatesFilter<"xeberdarliq"> | string
    olcmeVaxti?: DateTimeWithAggregatesFilter<"xeberdarliq"> | Date | string
    qiymet?: DecimalWithAggregatesFilter<"xeberdarliq"> | Decimal | DecimalJsLike | number | string
    novu?: StringWithAggregatesFilter<"xeberdarliq"> | string
    mesaj?: StringNullableWithAggregatesFilter<"xeberdarliq"> | string | null
    hellOlundu?: BoolWithAggregatesFilter<"xeberdarliq"> | boolean
    yaradilma?: DateTimeWithAggregatesFilter<"xeberdarliq"> | Date | string
  }

  export type cihazCreateInput = {
    kod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    sensorTipi: sensor_tipiCreateNestedOneWithoutCihazInput
    olcme?: olcmeCreateNestedManyWithoutCihazInput
    xeberdarliq?: xeberdarliqCreateNestedManyWithoutCihazInput
  }

  export type cihazUncheckedCreateInput = {
    kod: string
    sensorTipiKod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    olcme?: olcmeUncheckedCreateNestedManyWithoutCihazInput
    xeberdarliq?: xeberdarliqUncheckedCreateNestedManyWithoutCihazInput
  }

  export type cihazUpdateInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    sensorTipi?: sensor_tipiUpdateOneRequiredWithoutCihazNestedInput
    olcme?: olcmeUpdateManyWithoutCihazNestedInput
    xeberdarliq?: xeberdarliqUpdateManyWithoutCihazNestedInput
  }

  export type cihazUncheckedUpdateInput = {
    kod?: StringFieldUpdateOperationsInput | string
    sensorTipiKod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    olcme?: olcmeUncheckedUpdateManyWithoutCihazNestedInput
    xeberdarliq?: xeberdarliqUncheckedUpdateManyWithoutCihazNestedInput
  }

  export type cihazCreateManyInput = {
    kod: string
    sensorTipiKod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
  }

  export type cihazUpdateManyMutationInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cihazUncheckedUpdateManyInput = {
    kod?: StringFieldUpdateOperationsInput | string
    sensorTipiKod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type olcmeCreateInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    keyfiyyet?: number
    syncStatus?: number
    yaradilma?: Date | string
    cihaz: cihazCreateNestedOneWithoutOlcmeInput
  }

  export type olcmeUncheckedCreateInput = {
    id?: bigint | number
    cihazKod: string
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    keyfiyyet?: number
    syncStatus?: number
    yaradilma?: Date | string
  }

  export type olcmeUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    cihaz?: cihazUpdateOneRequiredWithoutOlcmeNestedInput
  }

  export type olcmeUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    cihazKod?: StringFieldUpdateOperationsInput | string
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type olcmeCreateManyInput = {
    id?: bigint | number
    cihazKod: string
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    keyfiyyet?: number
    syncStatus?: number
    yaradilma?: Date | string
  }

  export type olcmeUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type olcmeUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    cihazKod?: StringFieldUpdateOperationsInput | string
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_tipiCreateInput = {
    kod: string
    ad: string
    vahid: string
    minHedd?: Decimal | DecimalJsLike | number | string | null
    maxHedd?: Decimal | DecimalJsLike | number | string | null
    tesvir?: string | null
    yaradilma?: Date | string
    cihaz?: cihazCreateNestedManyWithoutSensorTipiInput
  }

  export type sensor_tipiUncheckedCreateInput = {
    kod: string
    ad: string
    vahid: string
    minHedd?: Decimal | DecimalJsLike | number | string | null
    maxHedd?: Decimal | DecimalJsLike | number | string | null
    tesvir?: string | null
    yaradilma?: Date | string
    cihaz?: cihazUncheckedCreateNestedManyWithoutSensorTipiInput
  }

  export type sensor_tipiUpdateInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    vahid?: StringFieldUpdateOperationsInput | string
    minHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tesvir?: NullableStringFieldUpdateOperationsInput | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    cihaz?: cihazUpdateManyWithoutSensorTipiNestedInput
  }

  export type sensor_tipiUncheckedUpdateInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    vahid?: StringFieldUpdateOperationsInput | string
    minHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tesvir?: NullableStringFieldUpdateOperationsInput | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    cihaz?: cihazUncheckedUpdateManyWithoutSensorTipiNestedInput
  }

  export type sensor_tipiCreateManyInput = {
    kod: string
    ad: string
    vahid: string
    minHedd?: Decimal | DecimalJsLike | number | string | null
    maxHedd?: Decimal | DecimalJsLike | number | string | null
    tesvir?: string | null
    yaradilma?: Date | string
  }

  export type sensor_tipiUpdateManyMutationInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    vahid?: StringFieldUpdateOperationsInput | string
    minHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tesvir?: NullableStringFieldUpdateOperationsInput | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_tipiUncheckedUpdateManyInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    vahid?: StringFieldUpdateOperationsInput | string
    minHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tesvir?: NullableStringFieldUpdateOperationsInput | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type xeberdarliqCreateInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    novu: string
    mesaj?: string | null
    hellOlundu?: boolean
    yaradilma?: Date | string
    cihaz: cihazCreateNestedOneWithoutXeberdarliqInput
  }

  export type xeberdarliqUncheckedCreateInput = {
    id?: bigint | number
    cihazKod: string
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    novu: string
    mesaj?: string | null
    hellOlundu?: boolean
    yaradilma?: Date | string
  }

  export type xeberdarliqUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    cihaz?: cihazUpdateOneRequiredWithoutXeberdarliqNestedInput
  }

  export type xeberdarliqUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    cihazKod?: StringFieldUpdateOperationsInput | string
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type xeberdarliqCreateManyInput = {
    id?: bigint | number
    cihazKod: string
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    novu: string
    mesaj?: string | null
    hellOlundu?: boolean
    yaradilma?: Date | string
  }

  export type xeberdarliqUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type xeberdarliqUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    cihazKod?: StringFieldUpdateOperationsInput | string
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Sensor_tipiScalarRelationFilter = {
    is?: sensor_tipiWhereInput
    isNot?: sensor_tipiWhereInput
  }

  export type OlcmeListRelationFilter = {
    every?: olcmeWhereInput
    some?: olcmeWhereInput
    none?: olcmeWhereInput
  }

  export type XeberdarliqListRelationFilter = {
    every?: xeberdarliqWhereInput
    some?: xeberdarliqWhereInput
    none?: xeberdarliqWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type olcmeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type xeberdarliqOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type cihazCountOrderByAggregateInput = {
    kod?: SortOrder
    sensorTipiKod?: SortOrder
    ad?: SortOrder
    yer?: SortOrder
    status?: SortOrder
    qurasdirilma?: SortOrder
    yaradilma?: SortOrder
  }

  export type cihazMaxOrderByAggregateInput = {
    kod?: SortOrder
    sensorTipiKod?: SortOrder
    ad?: SortOrder
    yer?: SortOrder
    status?: SortOrder
    qurasdirilma?: SortOrder
    yaradilma?: SortOrder
  }

  export type cihazMinOrderByAggregateInput = {
    kod?: SortOrder
    sensorTipiKod?: SortOrder
    ad?: SortOrder
    yer?: SortOrder
    status?: SortOrder
    qurasdirilma?: SortOrder
    yaradilma?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CihazScalarRelationFilter = {
    is?: cihazWhereInput
    isNot?: cihazWhereInput
  }

  export type olcmeIdOlcmeVaxtiCompoundUniqueInput = {
    id: bigint | number
    olcmeVaxti: Date | string
  }

  export type olcmeCountOrderByAggregateInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
    yaradilma?: SortOrder
  }

  export type olcmeAvgOrderByAggregateInput = {
    id?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
  }

  export type olcmeMaxOrderByAggregateInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
    yaradilma?: SortOrder
  }

  export type olcmeMinOrderByAggregateInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
    yaradilma?: SortOrder
  }

  export type olcmeSumOrderByAggregateInput = {
    id?: SortOrder
    qiymet?: SortOrder
    keyfiyyet?: SortOrder
    syncStatus?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type CihazListRelationFilter = {
    every?: cihazWhereInput
    some?: cihazWhereInput
    none?: cihazWhereInput
  }

  export type cihazOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sensor_tipiCountOrderByAggregateInput = {
    kod?: SortOrder
    ad?: SortOrder
    vahid?: SortOrder
    minHedd?: SortOrder
    maxHedd?: SortOrder
    tesvir?: SortOrder
    yaradilma?: SortOrder
  }

  export type sensor_tipiAvgOrderByAggregateInput = {
    minHedd?: SortOrder
    maxHedd?: SortOrder
  }

  export type sensor_tipiMaxOrderByAggregateInput = {
    kod?: SortOrder
    ad?: SortOrder
    vahid?: SortOrder
    minHedd?: SortOrder
    maxHedd?: SortOrder
    tesvir?: SortOrder
    yaradilma?: SortOrder
  }

  export type sensor_tipiMinOrderByAggregateInput = {
    kod?: SortOrder
    ad?: SortOrder
    vahid?: SortOrder
    minHedd?: SortOrder
    maxHedd?: SortOrder
    tesvir?: SortOrder
    yaradilma?: SortOrder
  }

  export type sensor_tipiSumOrderByAggregateInput = {
    minHedd?: SortOrder
    maxHedd?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type xeberdarliqCountOrderByAggregateInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    novu?: SortOrder
    mesaj?: SortOrder
    hellOlundu?: SortOrder
    yaradilma?: SortOrder
  }

  export type xeberdarliqAvgOrderByAggregateInput = {
    id?: SortOrder
    qiymet?: SortOrder
  }

  export type xeberdarliqMaxOrderByAggregateInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    novu?: SortOrder
    mesaj?: SortOrder
    hellOlundu?: SortOrder
    yaradilma?: SortOrder
  }

  export type xeberdarliqMinOrderByAggregateInput = {
    id?: SortOrder
    cihazKod?: SortOrder
    olcmeVaxti?: SortOrder
    qiymet?: SortOrder
    novu?: SortOrder
    mesaj?: SortOrder
    hellOlundu?: SortOrder
    yaradilma?: SortOrder
  }

  export type xeberdarliqSumOrderByAggregateInput = {
    id?: SortOrder
    qiymet?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type sensor_tipiCreateNestedOneWithoutCihazInput = {
    create?: XOR<sensor_tipiCreateWithoutCihazInput, sensor_tipiUncheckedCreateWithoutCihazInput>
    connectOrCreate?: sensor_tipiCreateOrConnectWithoutCihazInput
    connect?: sensor_tipiWhereUniqueInput
  }

  export type olcmeCreateNestedManyWithoutCihazInput = {
    create?: XOR<olcmeCreateWithoutCihazInput, olcmeUncheckedCreateWithoutCihazInput> | olcmeCreateWithoutCihazInput[] | olcmeUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: olcmeCreateOrConnectWithoutCihazInput | olcmeCreateOrConnectWithoutCihazInput[]
    createMany?: olcmeCreateManyCihazInputEnvelope
    connect?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
  }

  export type xeberdarliqCreateNestedManyWithoutCihazInput = {
    create?: XOR<xeberdarliqCreateWithoutCihazInput, xeberdarliqUncheckedCreateWithoutCihazInput> | xeberdarliqCreateWithoutCihazInput[] | xeberdarliqUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: xeberdarliqCreateOrConnectWithoutCihazInput | xeberdarliqCreateOrConnectWithoutCihazInput[]
    createMany?: xeberdarliqCreateManyCihazInputEnvelope
    connect?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
  }

  export type olcmeUncheckedCreateNestedManyWithoutCihazInput = {
    create?: XOR<olcmeCreateWithoutCihazInput, olcmeUncheckedCreateWithoutCihazInput> | olcmeCreateWithoutCihazInput[] | olcmeUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: olcmeCreateOrConnectWithoutCihazInput | olcmeCreateOrConnectWithoutCihazInput[]
    createMany?: olcmeCreateManyCihazInputEnvelope
    connect?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
  }

  export type xeberdarliqUncheckedCreateNestedManyWithoutCihazInput = {
    create?: XOR<xeberdarliqCreateWithoutCihazInput, xeberdarliqUncheckedCreateWithoutCihazInput> | xeberdarliqCreateWithoutCihazInput[] | xeberdarliqUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: xeberdarliqCreateOrConnectWithoutCihazInput | xeberdarliqCreateOrConnectWithoutCihazInput[]
    createMany?: xeberdarliqCreateManyCihazInputEnvelope
    connect?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type sensor_tipiUpdateOneRequiredWithoutCihazNestedInput = {
    create?: XOR<sensor_tipiCreateWithoutCihazInput, sensor_tipiUncheckedCreateWithoutCihazInput>
    connectOrCreate?: sensor_tipiCreateOrConnectWithoutCihazInput
    upsert?: sensor_tipiUpsertWithoutCihazInput
    connect?: sensor_tipiWhereUniqueInput
    update?: XOR<XOR<sensor_tipiUpdateToOneWithWhereWithoutCihazInput, sensor_tipiUpdateWithoutCihazInput>, sensor_tipiUncheckedUpdateWithoutCihazInput>
  }

  export type olcmeUpdateManyWithoutCihazNestedInput = {
    create?: XOR<olcmeCreateWithoutCihazInput, olcmeUncheckedCreateWithoutCihazInput> | olcmeCreateWithoutCihazInput[] | olcmeUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: olcmeCreateOrConnectWithoutCihazInput | olcmeCreateOrConnectWithoutCihazInput[]
    upsert?: olcmeUpsertWithWhereUniqueWithoutCihazInput | olcmeUpsertWithWhereUniqueWithoutCihazInput[]
    createMany?: olcmeCreateManyCihazInputEnvelope
    set?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    disconnect?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    delete?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    connect?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    update?: olcmeUpdateWithWhereUniqueWithoutCihazInput | olcmeUpdateWithWhereUniqueWithoutCihazInput[]
    updateMany?: olcmeUpdateManyWithWhereWithoutCihazInput | olcmeUpdateManyWithWhereWithoutCihazInput[]
    deleteMany?: olcmeScalarWhereInput | olcmeScalarWhereInput[]
  }

  export type xeberdarliqUpdateManyWithoutCihazNestedInput = {
    create?: XOR<xeberdarliqCreateWithoutCihazInput, xeberdarliqUncheckedCreateWithoutCihazInput> | xeberdarliqCreateWithoutCihazInput[] | xeberdarliqUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: xeberdarliqCreateOrConnectWithoutCihazInput | xeberdarliqCreateOrConnectWithoutCihazInput[]
    upsert?: xeberdarliqUpsertWithWhereUniqueWithoutCihazInput | xeberdarliqUpsertWithWhereUniqueWithoutCihazInput[]
    createMany?: xeberdarliqCreateManyCihazInputEnvelope
    set?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    disconnect?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    delete?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    connect?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    update?: xeberdarliqUpdateWithWhereUniqueWithoutCihazInput | xeberdarliqUpdateWithWhereUniqueWithoutCihazInput[]
    updateMany?: xeberdarliqUpdateManyWithWhereWithoutCihazInput | xeberdarliqUpdateManyWithWhereWithoutCihazInput[]
    deleteMany?: xeberdarliqScalarWhereInput | xeberdarliqScalarWhereInput[]
  }

  export type olcmeUncheckedUpdateManyWithoutCihazNestedInput = {
    create?: XOR<olcmeCreateWithoutCihazInput, olcmeUncheckedCreateWithoutCihazInput> | olcmeCreateWithoutCihazInput[] | olcmeUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: olcmeCreateOrConnectWithoutCihazInput | olcmeCreateOrConnectWithoutCihazInput[]
    upsert?: olcmeUpsertWithWhereUniqueWithoutCihazInput | olcmeUpsertWithWhereUniqueWithoutCihazInput[]
    createMany?: olcmeCreateManyCihazInputEnvelope
    set?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    disconnect?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    delete?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    connect?: olcmeWhereUniqueInput | olcmeWhereUniqueInput[]
    update?: olcmeUpdateWithWhereUniqueWithoutCihazInput | olcmeUpdateWithWhereUniqueWithoutCihazInput[]
    updateMany?: olcmeUpdateManyWithWhereWithoutCihazInput | olcmeUpdateManyWithWhereWithoutCihazInput[]
    deleteMany?: olcmeScalarWhereInput | olcmeScalarWhereInput[]
  }

  export type xeberdarliqUncheckedUpdateManyWithoutCihazNestedInput = {
    create?: XOR<xeberdarliqCreateWithoutCihazInput, xeberdarliqUncheckedCreateWithoutCihazInput> | xeberdarliqCreateWithoutCihazInput[] | xeberdarliqUncheckedCreateWithoutCihazInput[]
    connectOrCreate?: xeberdarliqCreateOrConnectWithoutCihazInput | xeberdarliqCreateOrConnectWithoutCihazInput[]
    upsert?: xeberdarliqUpsertWithWhereUniqueWithoutCihazInput | xeberdarliqUpsertWithWhereUniqueWithoutCihazInput[]
    createMany?: xeberdarliqCreateManyCihazInputEnvelope
    set?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    disconnect?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    delete?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    connect?: xeberdarliqWhereUniqueInput | xeberdarliqWhereUniqueInput[]
    update?: xeberdarliqUpdateWithWhereUniqueWithoutCihazInput | xeberdarliqUpdateWithWhereUniqueWithoutCihazInput[]
    updateMany?: xeberdarliqUpdateManyWithWhereWithoutCihazInput | xeberdarliqUpdateManyWithWhereWithoutCihazInput[]
    deleteMany?: xeberdarliqScalarWhereInput | xeberdarliqScalarWhereInput[]
  }

  export type cihazCreateNestedOneWithoutOlcmeInput = {
    create?: XOR<cihazCreateWithoutOlcmeInput, cihazUncheckedCreateWithoutOlcmeInput>
    connectOrCreate?: cihazCreateOrConnectWithoutOlcmeInput
    connect?: cihazWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type cihazUpdateOneRequiredWithoutOlcmeNestedInput = {
    create?: XOR<cihazCreateWithoutOlcmeInput, cihazUncheckedCreateWithoutOlcmeInput>
    connectOrCreate?: cihazCreateOrConnectWithoutOlcmeInput
    upsert?: cihazUpsertWithoutOlcmeInput
    connect?: cihazWhereUniqueInput
    update?: XOR<XOR<cihazUpdateToOneWithWhereWithoutOlcmeInput, cihazUpdateWithoutOlcmeInput>, cihazUncheckedUpdateWithoutOlcmeInput>
  }

  export type cihazCreateNestedManyWithoutSensorTipiInput = {
    create?: XOR<cihazCreateWithoutSensorTipiInput, cihazUncheckedCreateWithoutSensorTipiInput> | cihazCreateWithoutSensorTipiInput[] | cihazUncheckedCreateWithoutSensorTipiInput[]
    connectOrCreate?: cihazCreateOrConnectWithoutSensorTipiInput | cihazCreateOrConnectWithoutSensorTipiInput[]
    createMany?: cihazCreateManySensorTipiInputEnvelope
    connect?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
  }

  export type cihazUncheckedCreateNestedManyWithoutSensorTipiInput = {
    create?: XOR<cihazCreateWithoutSensorTipiInput, cihazUncheckedCreateWithoutSensorTipiInput> | cihazCreateWithoutSensorTipiInput[] | cihazUncheckedCreateWithoutSensorTipiInput[]
    connectOrCreate?: cihazCreateOrConnectWithoutSensorTipiInput | cihazCreateOrConnectWithoutSensorTipiInput[]
    createMany?: cihazCreateManySensorTipiInputEnvelope
    connect?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type cihazUpdateManyWithoutSensorTipiNestedInput = {
    create?: XOR<cihazCreateWithoutSensorTipiInput, cihazUncheckedCreateWithoutSensorTipiInput> | cihazCreateWithoutSensorTipiInput[] | cihazUncheckedCreateWithoutSensorTipiInput[]
    connectOrCreate?: cihazCreateOrConnectWithoutSensorTipiInput | cihazCreateOrConnectWithoutSensorTipiInput[]
    upsert?: cihazUpsertWithWhereUniqueWithoutSensorTipiInput | cihazUpsertWithWhereUniqueWithoutSensorTipiInput[]
    createMany?: cihazCreateManySensorTipiInputEnvelope
    set?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    disconnect?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    delete?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    connect?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    update?: cihazUpdateWithWhereUniqueWithoutSensorTipiInput | cihazUpdateWithWhereUniqueWithoutSensorTipiInput[]
    updateMany?: cihazUpdateManyWithWhereWithoutSensorTipiInput | cihazUpdateManyWithWhereWithoutSensorTipiInput[]
    deleteMany?: cihazScalarWhereInput | cihazScalarWhereInput[]
  }

  export type cihazUncheckedUpdateManyWithoutSensorTipiNestedInput = {
    create?: XOR<cihazCreateWithoutSensorTipiInput, cihazUncheckedCreateWithoutSensorTipiInput> | cihazCreateWithoutSensorTipiInput[] | cihazUncheckedCreateWithoutSensorTipiInput[]
    connectOrCreate?: cihazCreateOrConnectWithoutSensorTipiInput | cihazCreateOrConnectWithoutSensorTipiInput[]
    upsert?: cihazUpsertWithWhereUniqueWithoutSensorTipiInput | cihazUpsertWithWhereUniqueWithoutSensorTipiInput[]
    createMany?: cihazCreateManySensorTipiInputEnvelope
    set?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    disconnect?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    delete?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    connect?: cihazWhereUniqueInput | cihazWhereUniqueInput[]
    update?: cihazUpdateWithWhereUniqueWithoutSensorTipiInput | cihazUpdateWithWhereUniqueWithoutSensorTipiInput[]
    updateMany?: cihazUpdateManyWithWhereWithoutSensorTipiInput | cihazUpdateManyWithWhereWithoutSensorTipiInput[]
    deleteMany?: cihazScalarWhereInput | cihazScalarWhereInput[]
  }

  export type cihazCreateNestedOneWithoutXeberdarliqInput = {
    create?: XOR<cihazCreateWithoutXeberdarliqInput, cihazUncheckedCreateWithoutXeberdarliqInput>
    connectOrCreate?: cihazCreateOrConnectWithoutXeberdarliqInput
    connect?: cihazWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type cihazUpdateOneRequiredWithoutXeberdarliqNestedInput = {
    create?: XOR<cihazCreateWithoutXeberdarliqInput, cihazUncheckedCreateWithoutXeberdarliqInput>
    connectOrCreate?: cihazCreateOrConnectWithoutXeberdarliqInput
    upsert?: cihazUpsertWithoutXeberdarliqInput
    connect?: cihazWhereUniqueInput
    update?: XOR<XOR<cihazUpdateToOneWithWhereWithoutXeberdarliqInput, cihazUpdateWithoutXeberdarliqInput>, cihazUncheckedUpdateWithoutXeberdarliqInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type sensor_tipiCreateWithoutCihazInput = {
    kod: string
    ad: string
    vahid: string
    minHedd?: Decimal | DecimalJsLike | number | string | null
    maxHedd?: Decimal | DecimalJsLike | number | string | null
    tesvir?: string | null
    yaradilma?: Date | string
  }

  export type sensor_tipiUncheckedCreateWithoutCihazInput = {
    kod: string
    ad: string
    vahid: string
    minHedd?: Decimal | DecimalJsLike | number | string | null
    maxHedd?: Decimal | DecimalJsLike | number | string | null
    tesvir?: string | null
    yaradilma?: Date | string
  }

  export type sensor_tipiCreateOrConnectWithoutCihazInput = {
    where: sensor_tipiWhereUniqueInput
    create: XOR<sensor_tipiCreateWithoutCihazInput, sensor_tipiUncheckedCreateWithoutCihazInput>
  }

  export type olcmeCreateWithoutCihazInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    keyfiyyet?: number
    syncStatus?: number
    yaradilma?: Date | string
  }

  export type olcmeUncheckedCreateWithoutCihazInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    keyfiyyet?: number
    syncStatus?: number
    yaradilma?: Date | string
  }

  export type olcmeCreateOrConnectWithoutCihazInput = {
    where: olcmeWhereUniqueInput
    create: XOR<olcmeCreateWithoutCihazInput, olcmeUncheckedCreateWithoutCihazInput>
  }

  export type olcmeCreateManyCihazInputEnvelope = {
    data: olcmeCreateManyCihazInput | olcmeCreateManyCihazInput[]
    skipDuplicates?: boolean
  }

  export type xeberdarliqCreateWithoutCihazInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    novu: string
    mesaj?: string | null
    hellOlundu?: boolean
    yaradilma?: Date | string
  }

  export type xeberdarliqUncheckedCreateWithoutCihazInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    novu: string
    mesaj?: string | null
    hellOlundu?: boolean
    yaradilma?: Date | string
  }

  export type xeberdarliqCreateOrConnectWithoutCihazInput = {
    where: xeberdarliqWhereUniqueInput
    create: XOR<xeberdarliqCreateWithoutCihazInput, xeberdarliqUncheckedCreateWithoutCihazInput>
  }

  export type xeberdarliqCreateManyCihazInputEnvelope = {
    data: xeberdarliqCreateManyCihazInput | xeberdarliqCreateManyCihazInput[]
    skipDuplicates?: boolean
  }

  export type sensor_tipiUpsertWithoutCihazInput = {
    update: XOR<sensor_tipiUpdateWithoutCihazInput, sensor_tipiUncheckedUpdateWithoutCihazInput>
    create: XOR<sensor_tipiCreateWithoutCihazInput, sensor_tipiUncheckedCreateWithoutCihazInput>
    where?: sensor_tipiWhereInput
  }

  export type sensor_tipiUpdateToOneWithWhereWithoutCihazInput = {
    where?: sensor_tipiWhereInput
    data: XOR<sensor_tipiUpdateWithoutCihazInput, sensor_tipiUncheckedUpdateWithoutCihazInput>
  }

  export type sensor_tipiUpdateWithoutCihazInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    vahid?: StringFieldUpdateOperationsInput | string
    minHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tesvir?: NullableStringFieldUpdateOperationsInput | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_tipiUncheckedUpdateWithoutCihazInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    vahid?: StringFieldUpdateOperationsInput | string
    minHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxHedd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tesvir?: NullableStringFieldUpdateOperationsInput | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type olcmeUpsertWithWhereUniqueWithoutCihazInput = {
    where: olcmeWhereUniqueInput
    update: XOR<olcmeUpdateWithoutCihazInput, olcmeUncheckedUpdateWithoutCihazInput>
    create: XOR<olcmeCreateWithoutCihazInput, olcmeUncheckedCreateWithoutCihazInput>
  }

  export type olcmeUpdateWithWhereUniqueWithoutCihazInput = {
    where: olcmeWhereUniqueInput
    data: XOR<olcmeUpdateWithoutCihazInput, olcmeUncheckedUpdateWithoutCihazInput>
  }

  export type olcmeUpdateManyWithWhereWithoutCihazInput = {
    where: olcmeScalarWhereInput
    data: XOR<olcmeUpdateManyMutationInput, olcmeUncheckedUpdateManyWithoutCihazInput>
  }

  export type olcmeScalarWhereInput = {
    AND?: olcmeScalarWhereInput | olcmeScalarWhereInput[]
    OR?: olcmeScalarWhereInput[]
    NOT?: olcmeScalarWhereInput | olcmeScalarWhereInput[]
    id?: BigIntFilter<"olcme"> | bigint | number
    cihazKod?: StringFilter<"olcme"> | string
    olcmeVaxti?: DateTimeFilter<"olcme"> | Date | string
    qiymet?: DecimalFilter<"olcme"> | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFilter<"olcme"> | number
    syncStatus?: IntFilter<"olcme"> | number
    yaradilma?: DateTimeFilter<"olcme"> | Date | string
  }

  export type xeberdarliqUpsertWithWhereUniqueWithoutCihazInput = {
    where: xeberdarliqWhereUniqueInput
    update: XOR<xeberdarliqUpdateWithoutCihazInput, xeberdarliqUncheckedUpdateWithoutCihazInput>
    create: XOR<xeberdarliqCreateWithoutCihazInput, xeberdarliqUncheckedCreateWithoutCihazInput>
  }

  export type xeberdarliqUpdateWithWhereUniqueWithoutCihazInput = {
    where: xeberdarliqWhereUniqueInput
    data: XOR<xeberdarliqUpdateWithoutCihazInput, xeberdarliqUncheckedUpdateWithoutCihazInput>
  }

  export type xeberdarliqUpdateManyWithWhereWithoutCihazInput = {
    where: xeberdarliqScalarWhereInput
    data: XOR<xeberdarliqUpdateManyMutationInput, xeberdarliqUncheckedUpdateManyWithoutCihazInput>
  }

  export type xeberdarliqScalarWhereInput = {
    AND?: xeberdarliqScalarWhereInput | xeberdarliqScalarWhereInput[]
    OR?: xeberdarliqScalarWhereInput[]
    NOT?: xeberdarliqScalarWhereInput | xeberdarliqScalarWhereInput[]
    id?: BigIntFilter<"xeberdarliq"> | bigint | number
    cihazKod?: StringFilter<"xeberdarliq"> | string
    olcmeVaxti?: DateTimeFilter<"xeberdarliq"> | Date | string
    qiymet?: DecimalFilter<"xeberdarliq"> | Decimal | DecimalJsLike | number | string
    novu?: StringFilter<"xeberdarliq"> | string
    mesaj?: StringNullableFilter<"xeberdarliq"> | string | null
    hellOlundu?: BoolFilter<"xeberdarliq"> | boolean
    yaradilma?: DateTimeFilter<"xeberdarliq"> | Date | string
  }

  export type cihazCreateWithoutOlcmeInput = {
    kod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    sensorTipi: sensor_tipiCreateNestedOneWithoutCihazInput
    xeberdarliq?: xeberdarliqCreateNestedManyWithoutCihazInput
  }

  export type cihazUncheckedCreateWithoutOlcmeInput = {
    kod: string
    sensorTipiKod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    xeberdarliq?: xeberdarliqUncheckedCreateNestedManyWithoutCihazInput
  }

  export type cihazCreateOrConnectWithoutOlcmeInput = {
    where: cihazWhereUniqueInput
    create: XOR<cihazCreateWithoutOlcmeInput, cihazUncheckedCreateWithoutOlcmeInput>
  }

  export type cihazUpsertWithoutOlcmeInput = {
    update: XOR<cihazUpdateWithoutOlcmeInput, cihazUncheckedUpdateWithoutOlcmeInput>
    create: XOR<cihazCreateWithoutOlcmeInput, cihazUncheckedCreateWithoutOlcmeInput>
    where?: cihazWhereInput
  }

  export type cihazUpdateToOneWithWhereWithoutOlcmeInput = {
    where?: cihazWhereInput
    data: XOR<cihazUpdateWithoutOlcmeInput, cihazUncheckedUpdateWithoutOlcmeInput>
  }

  export type cihazUpdateWithoutOlcmeInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    sensorTipi?: sensor_tipiUpdateOneRequiredWithoutCihazNestedInput
    xeberdarliq?: xeberdarliqUpdateManyWithoutCihazNestedInput
  }

  export type cihazUncheckedUpdateWithoutOlcmeInput = {
    kod?: StringFieldUpdateOperationsInput | string
    sensorTipiKod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    xeberdarliq?: xeberdarliqUncheckedUpdateManyWithoutCihazNestedInput
  }

  export type cihazCreateWithoutSensorTipiInput = {
    kod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    olcme?: olcmeCreateNestedManyWithoutCihazInput
    xeberdarliq?: xeberdarliqCreateNestedManyWithoutCihazInput
  }

  export type cihazUncheckedCreateWithoutSensorTipiInput = {
    kod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    olcme?: olcmeUncheckedCreateNestedManyWithoutCihazInput
    xeberdarliq?: xeberdarliqUncheckedCreateNestedManyWithoutCihazInput
  }

  export type cihazCreateOrConnectWithoutSensorTipiInput = {
    where: cihazWhereUniqueInput
    create: XOR<cihazCreateWithoutSensorTipiInput, cihazUncheckedCreateWithoutSensorTipiInput>
  }

  export type cihazCreateManySensorTipiInputEnvelope = {
    data: cihazCreateManySensorTipiInput | cihazCreateManySensorTipiInput[]
    skipDuplicates?: boolean
  }

  export type cihazUpsertWithWhereUniqueWithoutSensorTipiInput = {
    where: cihazWhereUniqueInput
    update: XOR<cihazUpdateWithoutSensorTipiInput, cihazUncheckedUpdateWithoutSensorTipiInput>
    create: XOR<cihazCreateWithoutSensorTipiInput, cihazUncheckedCreateWithoutSensorTipiInput>
  }

  export type cihazUpdateWithWhereUniqueWithoutSensorTipiInput = {
    where: cihazWhereUniqueInput
    data: XOR<cihazUpdateWithoutSensorTipiInput, cihazUncheckedUpdateWithoutSensorTipiInput>
  }

  export type cihazUpdateManyWithWhereWithoutSensorTipiInput = {
    where: cihazScalarWhereInput
    data: XOR<cihazUpdateManyMutationInput, cihazUncheckedUpdateManyWithoutSensorTipiInput>
  }

  export type cihazScalarWhereInput = {
    AND?: cihazScalarWhereInput | cihazScalarWhereInput[]
    OR?: cihazScalarWhereInput[]
    NOT?: cihazScalarWhereInput | cihazScalarWhereInput[]
    kod?: StringFilter<"cihaz"> | string
    sensorTipiKod?: StringFilter<"cihaz"> | string
    ad?: StringFilter<"cihaz"> | string
    yer?: StringNullableFilter<"cihaz"> | string | null
    status?: StringFilter<"cihaz"> | string
    qurasdirilma?: DateTimeNullableFilter<"cihaz"> | Date | string | null
    yaradilma?: DateTimeFilter<"cihaz"> | Date | string
  }

  export type cihazCreateWithoutXeberdarliqInput = {
    kod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    sensorTipi: sensor_tipiCreateNestedOneWithoutCihazInput
    olcme?: olcmeCreateNestedManyWithoutCihazInput
  }

  export type cihazUncheckedCreateWithoutXeberdarliqInput = {
    kod: string
    sensorTipiKod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
    olcme?: olcmeUncheckedCreateNestedManyWithoutCihazInput
  }

  export type cihazCreateOrConnectWithoutXeberdarliqInput = {
    where: cihazWhereUniqueInput
    create: XOR<cihazCreateWithoutXeberdarliqInput, cihazUncheckedCreateWithoutXeberdarliqInput>
  }

  export type cihazUpsertWithoutXeberdarliqInput = {
    update: XOR<cihazUpdateWithoutXeberdarliqInput, cihazUncheckedUpdateWithoutXeberdarliqInput>
    create: XOR<cihazCreateWithoutXeberdarliqInput, cihazUncheckedCreateWithoutXeberdarliqInput>
    where?: cihazWhereInput
  }

  export type cihazUpdateToOneWithWhereWithoutXeberdarliqInput = {
    where?: cihazWhereInput
    data: XOR<cihazUpdateWithoutXeberdarliqInput, cihazUncheckedUpdateWithoutXeberdarliqInput>
  }

  export type cihazUpdateWithoutXeberdarliqInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    sensorTipi?: sensor_tipiUpdateOneRequiredWithoutCihazNestedInput
    olcme?: olcmeUpdateManyWithoutCihazNestedInput
  }

  export type cihazUncheckedUpdateWithoutXeberdarliqInput = {
    kod?: StringFieldUpdateOperationsInput | string
    sensorTipiKod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    olcme?: olcmeUncheckedUpdateManyWithoutCihazNestedInput
  }

  export type olcmeCreateManyCihazInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    keyfiyyet?: number
    syncStatus?: number
    yaradilma?: Date | string
  }

  export type xeberdarliqCreateManyCihazInput = {
    id?: bigint | number
    olcmeVaxti: Date | string
    qiymet: Decimal | DecimalJsLike | number | string
    novu: string
    mesaj?: string | null
    hellOlundu?: boolean
    yaradilma?: Date | string
  }

  export type olcmeUpdateWithoutCihazInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type olcmeUncheckedUpdateWithoutCihazInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type olcmeUncheckedUpdateManyWithoutCihazInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    keyfiyyet?: IntFieldUpdateOperationsInput | number
    syncStatus?: IntFieldUpdateOperationsInput | number
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type xeberdarliqUpdateWithoutCihazInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type xeberdarliqUncheckedUpdateWithoutCihazInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type xeberdarliqUncheckedUpdateManyWithoutCihazInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    olcmeVaxti?: DateTimeFieldUpdateOperationsInput | Date | string
    qiymet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    novu?: StringFieldUpdateOperationsInput | string
    mesaj?: NullableStringFieldUpdateOperationsInput | string | null
    hellOlundu?: BoolFieldUpdateOperationsInput | boolean
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cihazCreateManySensorTipiInput = {
    kod: string
    ad: string
    yer?: string | null
    status?: string
    qurasdirilma?: Date | string | null
    yaradilma?: Date | string
  }

  export type cihazUpdateWithoutSensorTipiInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    olcme?: olcmeUpdateManyWithoutCihazNestedInput
    xeberdarliq?: xeberdarliqUpdateManyWithoutCihazNestedInput
  }

  export type cihazUncheckedUpdateWithoutSensorTipiInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
    olcme?: olcmeUncheckedUpdateManyWithoutCihazNestedInput
    xeberdarliq?: xeberdarliqUncheckedUpdateManyWithoutCihazNestedInput
  }

  export type cihazUncheckedUpdateManyWithoutSensorTipiInput = {
    kod?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    yer?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qurasdirilma?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yaradilma?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}